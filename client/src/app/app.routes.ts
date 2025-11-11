import { Routes } from '@angular/router';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'procedures', pathMatch: 'full' },
  { path: 'procedures', component: ProceduresListComponent },
  { path: 'procedures/:id', component: ProcedureDetailComponent },
  { path: '**', redirectTo: 'procedures' }
];
