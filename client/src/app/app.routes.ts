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

/*
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
*/

/* add fix for add being confused for id
import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';
import { SuppliesComponent } from './features/supplies/supplies.component';
import { TechsComponent } from './features/techs/techs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Procedures
  { path: 'procedures', component: ProceduresListComponent },
  { path: 'procedures/add/new', component: AddProcedureComponent },
  { path: 'procedures/:id', component: ProcedureDetailComponent },

  // Supplies
  { path: 'supplies', component: SuppliesComponent },

  // Techs
  { path: 'techs', component: TechsComponent },

  { path: '**', redirectTo: 'procedures' }
];
*/

/* adding login security
import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';
import { SuppliesComponent } from './features/supplies/supplies.component';
import { TechsComponent } from './features/techs/techs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Procedures
  { path: 'procedures', component: ProceduresListComponent },

  // ✅ Add page aliases (so any button/link works)
  { path: 'procedures/add', redirectTo: 'procedures/add/new', pathMatch: 'full' },
  { path: 'procedures/add/new', component: AddProcedureComponent },

  // Detail MUST remain after add routes
  { path: 'procedures/:id', component: ProcedureDetailComponent },

  // Supplies
  { path: 'supplies', component: SuppliesComponent },

  // Techs
  { path: 'techs', component: TechsComponent },

  { path: '**', redirectTo: 'procedures' }
];
*/

import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';
import { SuppliesComponent } from './features/supplies/supplies.component';
import { TechsComponent } from './features/techs/techs.component';
import { LoginComponent } from './features/auth/login/login.component';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Auth
  { path: 'login', component: LoginComponent },

  // Procedures (protected)
  { path: 'procedures', component: ProceduresListComponent, canActivate: [AuthGuard] },
  { path: 'procedures/add/new', component: AddProcedureComponent, canActivate: [AuthGuard] },
  { path: 'procedures/:id', component: ProcedureDetailComponent, canActivate: [AuthGuard] },

  // Supplies (protected or not - your choice)
  { path: 'supplies', component: SuppliesComponent, canActivate: [AuthGuard] },

  // Techs
  { path: 'techs', component: TechsComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];
