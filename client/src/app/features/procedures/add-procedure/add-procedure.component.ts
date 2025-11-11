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
