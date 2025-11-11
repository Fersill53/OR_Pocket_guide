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
