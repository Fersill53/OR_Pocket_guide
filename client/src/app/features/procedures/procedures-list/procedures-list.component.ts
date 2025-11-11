import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProceduresService } from "../../../core/services/procedures.service";
import { BehaviorSubject, Observable, startWith, switchMap, map } from "rxjs";
import { Procedure } from "../../../core/models/procedure.model";

@Component({
  selector: 'app-procedures-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './procedures-list.component.html',
  styleUrls: ['./procedures-list.component.scss']
})
export class ProceduresListComponent {
  q = '';
  private query$ = new BehaviorSubject<string>('');
  readonly filtered$!: Observable<Procedure[]>;
  readonly loading$ = new BehaviorSubject<boolean>(true);
  readonly empty$!: Observable<boolean>;

  constructor(private svc: ProceduresService) {
    this.filtered$ = this.query$.pipe(
      startWith(''),
      switchMap(query =>
        this.svc.getAll().pipe(
          map(list => {
            const term = (query ?? '').toLowerCase().trim();
            if (!term) return list;
            return list.filter((p: Procedure) =>
              p.name.toLowerCase().includes(term) ||
              p.service.toLowerCase().includes(term) ||
              (p.tags ?? []).some(t => t.toLowerCase().includes(term))
            );
          })
        )
      )
    );

    // toggle loading off when first value arrives
    this.svc.getAll().subscribe({
      next: () => this.loading$.next(false),
      error: () => this.loading$.next(false)
    });

    this.empty$ = this.filtered$.pipe(map(list => (list?.length ?? 0) === 0));
  }

  onQuery(v: string) {
    this.q = v;
    this.query$.next(v);
  }

  clear() {
    this.q = '';
    this.query$.next('');
  }
}
