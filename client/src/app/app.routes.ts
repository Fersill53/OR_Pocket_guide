/*
import { Routes } from '@angular/router';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'procedures', pathMatch: 'full' },
  { path: 'procedures', component: ProceduresListComponent },
  { path: 'procedures/:id', component: ProcedureDetailComponent },
  { path: '**', redirectTo: 'procedures' }
];
*

// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';

export const routes: Routes = [
  { path: '', redirectTo: 'procedures', pathMatch: 'full' },
  { path: 'procedures', component: ProceduresListComponent },
  { path: 'procedures/add', component: AddProcedureComponent },
  { path: 'procedures/:id', component: ProcedureDetailComponent },
  { path: '**', redirectTo: 'procedures' }
];
*/

import { Routes } from '@angular/router';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'procedures'
  },
  {
    path: 'procedures',
    component: ProceduresListComponent
  },
  {
    path: 'procedures/add',
    component: AddProcedureComponent
  },
  {
    path: 'procedures/:id',
    component: ProcedureDetailComponent
  },
  // 🔹 NEW: Supplies library page
  {
    path: 'supplies',
    loadComponent: () =>
      import('./features/supplies/supplies.component').then(
        (m) => m.SuppliesComponent
      )
  },
  {
    path: '**',
    redirectTo: 'procedures'
  }
];
