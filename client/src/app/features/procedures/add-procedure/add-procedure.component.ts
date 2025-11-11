/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../core/services/procedures.service';
import { Procedure } from '../../../core/models/procedure.model';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {
  model: Partial<Procedure> = {
    name: '',
    service: '',
    position: '',
    anesthesia: '',
    tags: []
  };

  tagInput = '';

  saving = false;
  error: string | null = null;

  constructor(private svc: ProceduresService, private router: Router) {}

  addTag() {
    const t = (this.tagInput ?? '').trim();
    if (!t) return;
    this.model.tags = Array.from(new Set([...(this.model.tags ?? []), t]));
    this.tagInput = '';
  }

  removeTag(t: string) {
    this.model.tags = (this.model.tags ?? []).filter(x => x !== t);
  }

  // very small client-side validation
  private validate(): string | null {
    if (!this.model.name || !this.model.name.trim()) return 'Name is required';
    if (!this.model.service || !this.model.service.trim()) return 'Service is required';
    return null;
  }

  submit() {
    this.error = null;
    const v = this.validate();
    if (v) { this.error = v; return; }

    const payload: Omit<Procedure,'id'> = {
      name: this.model.name!.trim(),
      service: this.model.service!.trim(),
      position: this.model.position?.trim(),
      anesthesia: this.model.anesthesia?.trim(),
      roomSetup: this.model.roomSetup ?? [],
      drapes: this.model.drapes ?? [],
      instruments: this.model.instruments ?? [],
      supplies: this.model.supplies ?? [],
      medications: this.model.medications ?? [],
      sutures: this.model.sutures ?? [],
      dressings: this.model.dressings ?? [],
      notes: this.model.notes ?? [],
      tags: this.model.tags ?? []
    };

    this.saving = true;
    this.svc.addProcedure(payload).subscribe({
      next: (created) => {
        this.saving = false;
        // navigate to detail page of new procedure
        this.router.navigate(['/procedures', created.id]);
      },
      error: (err) => {
        this.saving = false;
        this.error = 'Failed to save. Try again.';
        console.error(err);
      }
    });
  }
}
*/

/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../core/services/procedures.service';
import { Procedure } from '../../../core/models/procedure.model';

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {
  // keep Procedure-typed fields here
  model: Partial<Procedure> = {
    name: '',
    service: '',
    position: '',
    anesthesia: '',
    tags: []
  };

  // separate text-area backing field for quick multi-line input
  instrumentsText: string = '';
  saving = false;
  error: string | null = null;
  tagInput = '';

  constructor(private svc: ProceduresService, private router: Router) {}

  addTag() {
    const t = (this.tagInput ?? '').trim();
    if (!t) return;
    this.model.tags = Array.from(new Set([...(this.model.tags ?? []), t]));
    this.tagInput = '';
  }

  removeTag(t: string) {
    this.model.tags = (this.model.tags ?? []).filter(x => x !== t);
  }

  private validate(): string | null {
    if (!this.model.name || !this.model.name.trim()) return 'Name is required';
    if (!this.model.service || !this.model.service.trim()) return 'Service is required';
    return null;
  }

  submit() {
    this.error = null;
    const v = this.validate();
    if (v) { this.error = v; return; }

    // convert instrumentsText into structured instruments array
    const instruments = (this.instrumentsText ?? '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name }));

    const payload: Omit<Procedure,'id'> = {
      name: this.model.name!.trim(),
      service: this.model.service!.trim(),
      position: this.model.position?.trim(),
      anesthesia: this.model.anesthesia?.trim(),
      roomSetup: this.model.roomSetup ?? [],
      drapes: this.model.drapes ?? [],
      instruments: instruments,
      supplies: this.model.supplies ?? [],
      medications: this.model.medications ?? [],
      sutures: this.model.sutures ?? [],
      dressings: this.model.dressings ?? [],
      notes: this.model.notes ?? [],
      tags: this.model.tags ?? []
    };

    this.saving = true;
    this.svc.addProcedure(payload).subscribe({
      next: (created) => {
        this.saving = false;
        // navigate to the new procedure's detail page
        this.router.navigate(['/procedures', created.id]);
      },
      error: (err) => {
        this.saving = false;
        this.error = 'Failed to save. Try again.';
        console.error(err);
      }
    });
  }
}
*/

/*
// src/app/features/procedures/add-procedure/add-procedure.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../core/services/procedures.service';
import { Procedure } from '../../../core/models/procedure.model';

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {
  model: Partial<Procedure> = {
    name: '',
    service: '',
    tags: []
  };

  instrumentsText = '';
  tagInput = '';
  saving = false;
  error: string | null = null;

  constructor(private svc: ProceduresService, private router: Router) {}

  addTag() {
    const t = (this.tagInput ?? '').trim();
    if (!t) return;
    this.model.tags = Array.from(new Set([...(this.model.tags ?? []), t]));
    this.tagInput = '';
  }

  removeTag(t: string) {
    this.model.tags = (this.model.tags ?? []).filter(x => x !== t);
  }

  private validate(): string | null {
    if (!this.model.name || !this.model.name.trim()) return 'Name is required';
    if (!this.model.service || !this.model.service.trim()) return 'Service is required';
    return null;
  }

  submit() {
    this.error = null;
    const v = this.validate();
    if (v) { this.error = v; return; }

    const instruments = (this.instrumentsText ?? '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name }));

    const payload: Omit<Procedure, 'id'> = {
      name: this.model.name!.trim(),
      service: this.model.service!.trim(),
      position: this.model.position ?? '',
      anesthesia: this.model.anesthesia ?? '',
      roomSetup: this.model.roomSetup ?? [],
      drapes: this.model.drapes ?? [],
      instruments,
      supplies: this.model.supplies ?? [],
      medications: this.model.medications ?? [],
      sutures: this.model.sutures ?? [],
      dressings: this.model.dressings ?? [],
      notes: this.model.notes ?? [],
      tags: this.model.tags ?? []
    };

    this.saving = true;
    this.svc.addProcedure(payload).subscribe({
      next: created => {
        this.saving = false;
        this.router.navigate(['/procedures', created.id]);
      },
      error: err => {
        this.saving = false;
        this.error = 'Failed to save — try again.';
        console.error(err);
      }
    });
  }
}
*/

/*
// src/app/features/procedures/add-procedure/add-procedure.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../core/services/procedures.service';
import { Procedure, Item } from '../../../core/models/procedure.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {
  // primary model (keeps Procedure shape but without id)
  model: Partial<Procedure> = {
    name: '',
    service: '',
    position: '',
    anesthesia: '',
    tags: []
  };

  // quick multiline backing fields for convenience (one-per-line)
  roomSetupText = '';
  drapesText = '';
  instrumentsText = '';
  suppliesText = ''; // syntax optionally: "Cannula|2" or just "Cannula"
  medicationsText = ''; // syntax optionally: "Lidocaine|Per surgeon" or just "Lidocaine"
  suturesText = '';
  dressingsText = '';
  notesText = '';

  tagInput = '';
  saving = false;
  error: string | null = null;

  constructor(private svc: ProceduresService, private router: Router) {}

  addTag() {
    const t = (this.tagInput ?? '').trim();
    if (!t) return;
    this.model.tags = Array.from(new Set([...(this.model.tags ?? []), t]));
    this.tagInput = '';
  }

  removeTag(t: string) {
    this.model.tags = (this.model.tags ?? []).filter(x => x !== t);
  }

  private validate(): string | null {
    if (!this.model.name || !this.model.name.trim()) return 'Name is required';
    if (!this.model.service || !this.model.service.trim()) return 'Service is required';
    return null;
  }

  // helpers to parse lines into structured arrays
  private parseLinesToStrings(text: string): string[] {
    return (text ?? '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
  }

  private parseLinesToItems(text: string, supportsQty = false, supportsNotes = false): Item[] {
    // supported line formats:
    // - name
    // - name|qty       (if supportsQty)
    // - name|notes     (if supportsNotes)
    // - name|qty|notes (if both true — qty first)
    return this.parseLinesToStrings(text).map(line => {
      const parts = line.split('|').map(p => p.trim());
      const item: Item = { name: parts[0] };

      if (supportsQty && parts.length >= 2 && parts[1] !== '') {
        const maybeNum = Number(parts[1]);
        if (!Number.isNaN(maybeNum)) item.qty = maybeNum;
        else if (supportsNotes) item.notes = parts.slice(1).join(' | ');
      } else if (supportsNotes && parts.length >= 2) {
        item.notes = parts.slice(1).join(' | ');
      }

      if (supportsQty && parts.length >= 3) {
        const maybeNum = Number(parts[1]);
        if (!Number.isNaN(maybeNum)) item.qty = maybeNum;
        item.notes = parts.slice(2).join(' | ');
      }

      return item;
    });
  }

  submit() {
    this.error = null;
    const v = this.validate();
    if (v) { this.error = v; return; }

    // Build structured arrays
    const roomSetup = this.parseLinesToStrings(this.roomSetupText);
    const drapes = this.parseLinesToItems(this.drapesText);
    const instruments = this.parseLinesToItems(this.instrumentsText);
    const supplies = this.parseLinesToItems(this.suppliesText, true); // allow qty
    const medications = this.parseLinesToItems(this.medicationsText, false, true); // allow notes
    const sutures = this.parseLinesToItems(this.suturesText);
    const dressings = this.parseLinesToItems(this.dressingsText);
    const notes = this.parseLinesToStrings(this.notesText);

    const payload: Omit<Procedure, 'id'> = {
      name: this.model.name!.trim(),
      service: this.model.service!.trim(),
      position: (this.model.position ?? '').trim(),
      anesthesia: (this.model.anesthesia ?? '').trim(),
      roomSetup,
      drapes,
      instruments,
      supplies,
      medications,
      sutures,
      dressings,
      notes,
      tags: this.model.tags ?? []
    };

    this.saving = true;
    this.svc.addProcedure(payload).subscribe({
      next: created => {
        this.saving = false;
        // navigate to the new procedure
        this.router.navigate(['/procedures', created.id]);
      },
      error: err => {
        this.saving = false;
        this.error = 'Failed to save — try again.';
        console.error(err);
      }
    });
  }
}


import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProceduresService } from "../../../core/services/procedures.service";
import { Procedure } from "../../../core/models/procedure.model";

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {

  model: Partial<Procedure> = {
    tags: [],
    roomSetup: [],
    drapes: [],
    instruments: [],
    supplies: [],
    medications: [],
    sutures: [],
    dressings: [],
    notes: []
  };

  tagInput = '';

  constructor(private svc: ProceduresService, private router: Router) {}

  addTag() {
    if (this.tagInput.trim()) {
      this.model.tags!.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  createProcedure() {
    this.svc.createProcedure(this.model as Procedure).subscribe(() => {
      this.router.navigate(['/procedures']);
    });
  }

  cancel() {
    this.router.navigate(['/procedures']); // ✅ <-- send them back to procedures list
  }
}
*/

// src/app/features/procedures/add-procedure/add-procedure.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../core/services/procedures.service';
import { Procedure, Item } from '../../../core/models/procedure.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {
  // Primary form model (keeps Procedure shape without id)
  model: Partial<Procedure> = {
    name: '',
    service: '',
    position: '',
    anesthesia: '',
    tags: []
  };

  // multiline backing fields used by the template
  roomSetupText = '';
  drapesText = '';
  instrumentsText = '';
  suppliesText = '';
  medicationsText = '';
  suturesText = '';
  dressingsText = '';
  notesText = '';

  tagInput = '';
  saving = false;
  error: string | null = null;

  constructor(private svc: ProceduresService, private router: Router) {}

  // add a tag from the small input
  addTag() {
    const t = (this.tagInput ?? '').trim();
    if (!t) return;
    this.model.tags = Array.from(new Set([...(this.model.tags ?? []), t]));
    this.tagInput = '';
  }

  // remove a tag from the tags array
  removeTag(t: string) {
    this.model.tags = (this.model.tags ?? []).filter(x => x !== t);
  }

  // simple client-side validation
  private validate(): string | null {
    if (!this.model.name || !this.model.name.trim()) return 'Name is required';
    if (!this.model.service || !this.model.service.trim()) return 'Service is required';
    return null;
  }

  // helpers to parse textareas into arrays
  private parseLinesToStrings(text: string): string[] {
    return (text ?? '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
  }

  private parseLinesToItems(text: string, supportsQty = false, supportsNotes = false): Item[] {
    // Supported formats:
    // - "Name"
    // - "Name | 2" (qty if supportsQty)
    // - "Name | note" (note if supportsNotes)
    // - "Name | 2 | note" (qty then note)
    return this.parseLinesToStrings(text).map(line => {
      const parts = line.split('|').map(p => p.trim());
      const item: Item = { name: parts[0] };

      if (supportsQty && parts.length >= 2) {
        const maybeNum = Number(parts[1]);
        if (!Number.isNaN(maybeNum)) {
          item.qty = maybeNum;
          if (parts.length >= 3) item.notes = parts.slice(2).join(' | ');
        } else if (supportsNotes) {
          // second part is notes instead of qty
          item.notes = parts.slice(1).join(' | ');
        }
      } else if (supportsNotes && parts.length >= 2) {
        item.notes = parts.slice(1).join(' | ');
      }

      return item;
    });
  }

  // submit handler called from the template: (ngSubmit)="submit()"
  submit() {
    this.error = null;
    const v = this.validate();
    if (v) {
      this.error = v;
      return;
    }

    // build structured arrays from textarea backing fields
    const roomSetup = this.parseLinesToStrings(this.roomSetupText);
    const drapes = this.parseLinesToItems(this.drapesText, false, true);
    const instruments = this.parseLinesToItems(this.instrumentsText);
    const supplies = this.parseLinesToItems(this.suppliesText, true, false);
    const medications = this.parseLinesToItems(this.medicationsText, false, true);
    const sutures = this.parseLinesToItems(this.suturesText);
    const dressings = this.parseLinesToItems(this.dressingsText);
    const notes = this.parseLinesToStrings(this.notesText);

    const payload: Omit<Procedure, 'id'> = {
      name: (this.model.name ?? '').trim(),
      service: (this.model.service ?? '').trim(),
      position: (this.model.position ?? '').trim(),
      anesthesia: (this.model.anesthesia ?? '').trim(),
      roomSetup,
      drapes,
      instruments,
      supplies,
      medications,
      sutures,
      dressings,
      notes,
      tags: this.model.tags ?? []
    };

    this.saving = true;

    // call service method - using createProcedure() because service was updated earlier
    // if your service uses addProcedure(), replace createProcedure with addProcedure
    const create$ = (this.svc as any).createProcedure
      ? (this.svc as any).createProcedure(payload)
      : (this.svc as any).addProcedure
      ? (this.svc as any).addProcedure(payload)
      : of(undefined);

    create$.subscribe({
      next: (created: any) => {
        this.saving = false;
        if (created && created.id) {
          this.router.navigate(['/procedures', created.id]);
        } else {
          // fallback to list if backend didn't return id
          this.router.navigate(['/procedures']);
        }
      },
      error: (err: any) => {
        console.error('Create failed', err);
        this.saving = false;
        this.error = 'Failed to save — try again.';
      }
    });
  }

  // Cancel navigation
  cancel() {
    this.router.navigate(['/procedures']);
  }
}

