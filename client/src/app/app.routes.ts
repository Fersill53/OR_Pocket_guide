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

/*
import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';

import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';

import { SuppliesComponent } from './features/supplies/supplies.component';
import { TechsComponent } from './features/techs/techs.component';

export const routes: Routes = [
  // ✅ public
  { path: 'login', component: LoginComponent },

  // ✅ protected
  { path: '', component: HomeComponent, canActivate: [authGuard] },

  { path: 'procedures', component: ProceduresListComponent, canActivate: [authGuard] },
  { path: 'procedures/add/new', component: AddProcedureComponent, canActivate: [authGuard] },
  { path: 'procedures/:id', component: ProcedureDetailComponent, canActivate: [authGuard] },

  { path: 'supplies', component: SuppliesComponent, canActivate: [authGuard] },
  { path: 'techs', component: TechsComponent, canActivate: [authGuard] },

  // fallback
  { path: '**', redirectTo: '' }
];
*

import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';
import { SuppliesComponent } from './features/supplies/supplies.component';
import { TechsComponent } from './features/techs/techs.component';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: HomeComponent },

  { path: 'procedures', component: ProceduresListComponent },
  { path: 'procedures/add/new', component: AddProcedureComponent },
  { path: 'procedures/:id', component: ProcedureDetailComponent },

  { path: 'supplies', component: SuppliesComponent },
  { path: 'techs', component: TechsComponent },

  { path: '**', redirectTo: '' }
];
*/

import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';

import { ProceduresListComponent } from './features/procedures/procedures-list/procedures-list.component';
import { ProcedureDetailComponent } from './features/procedures/procedure-detail/procedure-detail.component';
import { AddProcedureComponent } from './features/procedures/add-procedure/add-procedure.component';

import { SuppliesComponent } from './features/supplies/supplies.component';
import { TechsComponent } from './features/techs/techs.component';

import { AddBacktableSetupComponent } from './features/techs/backtable/add-backtable-setup/add-backtable-setup.component';

export const routes: Routes = [
  //Home
  { path : '', component: HomeComponent },

  //Procedures

  { path: 'procedures', component: ProcedureDetailComponent },
  { path: 'procedures/add/new', component: AddProcedureComponent },
  { path: 'procedures/:id', component: ProcedureDetailComponent },

  // Supplies

  { path: 'supplies', component: SuppliesComponent },

  // Techs main page (tabs live inside this page)

  { path: 'techs', component: TechsComponent },

  // Backtable add page (Where add backtable layout button goes)

  { path: 'techs/backtable/add', component: AddBacktableSetupComponent },

  // Wildcard

  { path: '**', redirectTo: '' }
];