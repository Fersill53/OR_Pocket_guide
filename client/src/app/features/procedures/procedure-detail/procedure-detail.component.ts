/*
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { ProceduresService } from "../../../core/services/procedures.service";
import { Procedure } from "../../../core/models/procedure.model";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-procedure-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss']
})
export class ProcedureDetailComponent {
  readonly procedure$!: Observable<Procedure | undefined>;
  editMode = false;
  editable?: Procedure;

  constructor(private route: ActivatedRoute, private svc: ProceduresService) {
    this.procedure$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.svc.getById(id);
      })
    );
  }

  startEdit(p: Procedure) {
    this.editable = JSON.parse(JSON.stringify(p)) as Procedure;
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.editable = undefined;
  }

  saveEdit() {
    if (!this.editable) return;
    this.svc.updateProcedure(this.editable).subscribe(() => {
      this.editMode = false;
      this.editable = undefined;
    });
  }

  addInstrument() {
    if (!this.editable) return;
    this.editable.instruments = this.editable.instruments ?? [];
    this.editable.instruments.push({ name: 'New instrument' });
  }

  removeInstrument(i: number) {
    if (!this.editable) return;
    this.editable.instruments?.splice(i, 1);
  }
}
*

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { ProceduresService } from "../../../core/services/procedures.service";
import { Procedure } from "../../../core/models/procedure.model";

@Component({
  selector: 'app-procedure-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss']
})
export class ProcedureDetailComponent {
  readonly procedure$!: Observable<Procedure | undefined>;
  editMode = false;
  editable?: Procedure;

  constructor(private route: ActivatedRoute, private svc: ProceduresService) {
    // create the observable inside the constructor so 'route' and 'svc' are defined
    this.procedure$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        // gracefully handle missing id
        if (!id) {
          return new Observable<Procedure | undefined>(sub => { sub.next(undefined); sub.complete(); });
        }
        return this.svc.getById(id);
      })
    );
  }

  startEdit(p: Procedure) {
    // shallow-deep clone to avoid mutating store directly
    this.editable = JSON.parse(JSON.stringify(p)) as Procedure;
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.editable = undefined;
  }

  saveEdit() {
    if (!this.editable) return;
    this.svc.updateProcedure(this.editable).subscribe(() => {
      this.editMode = false;
      this.editable = undefined;
    });
  }

  addInstrument() {
    if (!this.editable) return;
    this.editable.instruments = this.editable.instruments ?? [];
    this.editable.instruments.push({ name: 'New instrument' });
  }

  removeInstrument(i: number) {
    if (!this.editable) return;
    this.editable.instruments?.splice(i, 1);
  }
}
^^Previous working version minus delete button*/


/* Below is working version with delete button but messed up style
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ProceduresService } from "../../../core/services/procedures.service";
import { Procedure } from "../../../core/models/procedure.model";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-procedure-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss']
})
export class ProcedureDetailComponent {
  readonly procedure$!: Observable<Procedure | undefined>;
  editMode = false;
  editable?: Procedure;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: ProceduresService
  ) {
    this.procedure$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.svc.getById(id);
      })
    );
  }

  // -------- EDITING --------
  startEdit(p: Procedure) {
    this.editable = JSON.parse(JSON.stringify(p)) as Procedure;
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.editable = undefined;
  }

  saveEdit() {
    if (!this.editable) return;
    this.svc.updateProcedure(this.editable).subscribe(() => {
      this.editMode = false;
      this.editable = undefined;
      this.router.navigate(['/procedures']);
    });
  }

  // -------- DELETE --------
  confirmDelete(p: Procedure) {
    const id = p.id ?? (p as any)._id;

    if (!id) {
      alert("Cannot delete: missing id.");
      return;
    }

    const ok = confirm(`Delete procedure "${p.name}"?`);
    if (!ok) return;

    this.svc.deleteProcedure(id).subscribe({
      next: () => {
        alert("Deleted.");
        this.router.navigate(['/procedures']);
      },
      error: err => {
        console.error("Delete failed", err);
        alert("Error deleting procedure.");
      }
    });
  }
}
*/

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ProceduresService } from "../../../core/services/procedures.service";
import { Procedure } from "../../../core/models/procedure.model";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-procedure-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss']
})
export class ProcedureDetailComponent {
  readonly procedure$!: Observable<Procedure | undefined>;
  editMode = false;
  editable?: Procedure;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: ProceduresService
  ) {
    this.procedure$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.svc.getById(id);
      })
    );
  }

  // -------- EDITING --------
  startEdit(p: Procedure) {
    // deep clone so we don't mutate original until save
    this.editable = JSON.parse(JSON.stringify(p)) as Procedure;
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.editable = undefined;
  }

  saveEdit() {
    if (!this.editable) return;
    this.svc.updateProcedure(this.editable).subscribe({
      next: () => {
        this.editMode = false;
        this.editable = undefined;
        // you were previously staying on this page; we keep that behavior
        // the list will refetch on next navigation
      },
      error: err => {
        console.error('Update failed', err);
        alert('Error saving changes.');
      }
    });
  }

  // -------- DELETE --------
  confirmDelete(p: Procedure) {
    const id = (p as any).id ?? (p as any)._id;

    if (!id) {
      alert("Cannot delete: missing id.");
      return;
    }

    const ok = confirm(`Delete procedure "${p.name}"?`);
    if (!ok) return;

    this.svc.deleteProcedure(id).subscribe({
      next: () => {
        alert("Procedure deleted.");
        this.router.navigate(['/procedures']);
      },
      error: err => {
        console.error("Delete failed", err);
        alert("Error deleting procedure.");
      }
    });
  }

  // helpers for *ngFor in template so it doesn't choke on undefined
  asArray<T>(v: T[] | undefined | null): T[] {
    return v ?? [];
  }
}
