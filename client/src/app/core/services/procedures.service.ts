/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Procedure } from '../models/procedure.model';

const STORAGE_KEY = 'or_procedures';

@Injectable({ providedIn: 'root' })
export class ProceduresService {
  private store$ = new BehaviorSubject<Procedure[]>(this.load());

  private load(): Procedure[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(list: Procedure[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }

  /** Fetch all procedures 
  getAll(): Observable<Procedure[]> {
    return this.store$.asObservable();
  }

  /** Get one by ID 
  getById(id: string): Observable<Procedure | undefined> {
    const found = this.store$.value.find(p => p.id === id);
    return of(found);
  }

  /** Update existing 
  updateProcedure(proc: Procedure): Observable<Procedure> {
    const list = this.store$.value.map(p => (p.id === proc.id ? proc : p));
    this.store$.next(list);
    this.save(list);
    return of(proc);
  }

  /** Add new procedure 
  addProcedure(newProc: Omit<Procedure, 'id'>): Observable<Procedure> {
    const id = (window as any).crypto?.randomUUID
      ? (window as any).crypto.randomUUID()
      : 'p-' + Date.now();

    const proc: Procedure = { id, ...newProc };
    const list = [...this.store$.value, proc];

    this.store$.next(list);
    this.save(list);
    return of(proc);
  }
}
*/

/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Procedure } from '../models/procedure.model';

const STORAGE_KEY = 'or_procedures';

@Injectable({ providedIn: 'root' })
export class ProceduresService {
  private store$ = new BehaviorSubject<Procedure[]>([]);
  private initialized = false;

  constructor(private http: HttpClient) {
    this.initialize();
  }

  private initialize() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      this.store$.next(JSON.parse(raw));
      this.initialized = true;
      return;
    }

    // ✅ first time install → fetch assets JSON
    this.http.get<Procedure[]>('/assets/procedures.json')
      .subscribe({
        next: (data) => {
          this.store$.next(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          this.initialized = true;
        },
        error: (err) => {
          console.warn('No initial procedures.json found', err);
          this.initialized = true;
        }
      });
  }

  /** fetch all *
  getAll(): Observable<Procedure[]> {
    return this.store$.asObservable();
  }

  /** get one by ID 
  getById(id: string): Observable<Procedure | undefined> {
    return this.getAll().pipe(
      switchMap(list => of(list.find(p => p.id === id)))
    );
  }

  updateProcedure(proc: Procedure): Observable<Procedure> {
    const list = this.store$.value.map(p => (p.id === proc.id ? proc : p));
    this.store$.next(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return of(proc);
  }

  addProcedure(newProc: Omit<Procedure, 'id'>): Observable<Procedure> {
    const id = (window as any).crypto?.randomUUID
      ? (window as any).crypto.randomUUID()
      : 'p-' + Date.now();

    const proc: Procedure = { id, ...newProc };
    const list = [...this.store$.value, proc];

    this.store$.next(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    return of(proc);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Procedure } from '../models/procedure.model';

@Injectable({
  providedIn: 'root',
})
export class ProceduresService {
  private readonly baseUrl = 'http://localhost:3000'; // ✅ Change URL if needed

  constructor(private http: HttpClient) {}

  // ✅ GET all procedures
  getAll(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  // ✅ GET one procedure by id
  getById(id: string): Observable<Procedure | undefined> {
    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  // ✅ POST new procedure (added)
  createProcedure(proc: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  // ✅ PUT update existing procedure
  updateProcedure(proc: Procedure): Observable<Procedure> {
    return this.http.put<Procedure>(`${this.baseUrl}/procedures/${proc.id}`, proc);
  }

  // ✅ DELETE a procedure
  deleteProcedure(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/procedures/${
    

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedure } from '../models/procedure.model';

@Injectable({
  providedIn: 'root',
})
export class ProceduresService {
  private readonly baseUrl = 'http://localhost:3000'; // Change if needed

  constructor(private http: HttpClient) {}

  // ✅ GET all procedures
  getAll(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  // ✅ GET one procedure by id
  getById(id: string): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  // ✅ POST create new procedure
  createProcedure(proc: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  // ✅ PUT update existing procedure
  updateProcedure(proc: Procedure): Observable<Procedure> {
    return this.http.put<Procedure>(`${this.baseUrl}/procedures/${proc.id}`, proc);
  }

  // ✅ DELETE procedure
  deleteProcedure(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/procedures/${id}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  // Only used in development (localhost)
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all procedures
   * - DEV: from json-server (http://localhost:3000/procedures)
   * - PROD (GitHub Pages): from static assets/procedures.json (read-only)
   
  getAll(): Observable<Procedure[]> {
    if (environment.production) {
      // On GitHub Pages: read from bundled JSON
      return this.http.get<Procedure[]>('assets/procedures.json');
    }

    // Local dev: use json-server
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  /**
   * Get single procedure by id
   * In prod we just filter the list from assets.
   
  getById(id: string): Observable<Procedure | undefined> {
    if (environment.production) {
      return this.getAll().pipe(
        map(list => list.find(p => p.id === id))
      );
    }

    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  /**
   * Create a procedure
   * - DEV: POST to json-server
   * - PROD: no real backend; return error observable so we can show a message or ignore
   *
  createProcedure(proc: Procedure): Observable<Procedure> {
    if (environment.production) {
      console.warn('Create is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Create is disabled in production.'));
    }

    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  /**
   * Update a procedure
   * - DEV: PUT to json-server
   * - PROD: disabled (no backend)
   *
  updateProcedure(proc: Procedure): Observable<Procedure> {
    if (!proc.id) {
      return throwError(() => new Error('Procedure id is required.'));
    }

    if (environment.production) {
      console.warn('Update is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Update is disabled in production.'));
    }

    return this.http.put<Procedure>(
      `${this.baseUrl}/procedures/${proc.id}`,
      proc
    );
  }

  /**
   * Delete a procedure
   * - DEV: DELETE to json-server
   * - PROD: disabled (no backend)
   *
  deleteProcedure(id: string): Observable<void> {
    if (environment.production) {
      console.warn('Delete is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Delete is disabled in production.'));
    }

    return this.http.delete<void>(`${this.baseUrl}/procedures/${id}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  // Local dev base URL (json-server) from environment.ts
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all procedures
   * - DEV: from json-server (http://localhost:3000/procedures)
   * - PROD: from static assets/procedures.json (read-only)
   *
  getAll(): Observable<Procedure[]> {
    if (environment.production) {
      // GitHub Pages: read from bundled JSON
      return this.http.get<Procedure[]>('assets/procedures.json');
    }

    // Local dev: json-server
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  /**
   * Get single procedure by id.
   * In prod we just filter the list from assets.
   *
  getById(id: string): Observable<Procedure | undefined> {
    if (environment.production) {
      return this.getAll().pipe(
        map(list => list.find(p => p.id === id))
      );
    }

    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  /**
   * Create a procedure
   * - DEV: POST to json-server
   * - PROD: no backend → fail politely
   *
  createProcedure(proc: Procedure): Observable<Procedure> {
    if (environment.production) {
      console.warn('Create is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Create is disabled in production.'));
    }

    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  /**
   * Update a procedure
   * - DEV: PUT to json-server
   * - PROD: disabled
   *
  updateProcedure(proc: Procedure): Observable<Procedure> {
    if (!proc.id) {
      return throwError(() => new Error('Procedure id is required.'));
    }

    if (environment.production) {
      console.warn('Update is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Update is disabled in production.'));
    }

    return this.http.put<Procedure>(
      `${this.baseUrl}/procedures/${proc.id}`,
      proc
    );
  }

  /**
   * Delete a procedure
   * - DEV: DELETE to json-server
   * - PROD: disabled
   *
  deleteProcedure(id: string): Observable<void> {
    if (environment.production) {
      console.warn('Delete is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Delete is disabled in production.'));
    }

    return this.http.delete<void>(`${this.baseUrl}/procedures/${id}`);
  }
}
*/

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  // In dev: 'http://localhost:3000/api'
  // In prod: '' (unused, we go to assets)
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all procedures
   * - DEV: from Express API (http://localhost:3000/api/procedures)
   * - PROD: from static assets/procedures.json (read-only)
   *
  getAll(): Observable<Procedure[]> {
    if (environment.production) {
      // GitHub Pages: read from bundled JSON
      return this.http.get<Procedure[]>('assets/procedures.json');
    }

    // Local dev: Express + MongoDB Atlas
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  /**
   * Get single procedure by id.
   * In prod we just filter the list from assets.
   *
  getById(id: string): Observable<Procedure | undefined> {
    if (environment.production) {
      return this.getAll().pipe(
        map(list => list.find(p => p.id === id))
      );
    }

    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  /**
   * Create a procedure
   * - DEV: POST to Express API
   * - PROD: disabled (no backend on GitHub Pages)
   *
  createProcedure(proc: Procedure): Observable<Procedure> {
    if (environment.production) {
      console.warn('Create is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Create is disabled in production.'));
    }

    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  /**
   * Update a procedure
   * - DEV: PUT to Express API
   * - PROD: disabled
   *
  updateProcedure(proc: Procedure): Observable<Procedure> {
    if (!proc.id) {
      return throwError(() => new Error('Procedure id is required.'));
    }

    if (environment.production) {
      console.warn('Update is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Update is disabled in production.'));
    }

    return this.http.put<Procedure>(
      `${this.baseUrl}/procedures/${proc.id}`,
      proc
    );
  }

  /**
   * Delete a procedure
   * - DEV: DELETE to Express API
   * - PROD: disabled
   *
  deleteProcedure(id: string): Observable<void> {
    if (environment.production) {
      console.warn('Delete is disabled in production (GitHub Pages).');
      return throwError(() => new Error('Delete is disabled in production.'));
    }

    return this.http.delete<void>(`${this.baseUrl}/procedures/${id}`);
  }
}
*

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  // Dev:  http://localhost:3000/api
  // Prod: https://or-guide-api.onrender.com/api
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  getById(id: string): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  createProcedure(proc: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  updateProcedure(proc: Procedure): Observable<Procedure> {
    if (!proc.id) {
      return throwError(() => new Error('Procedure id is required.'));
    }
    return this.http.put<Procedure>(
      `${this.baseUrl}/procedures/${proc.id}`,
      proc
    );
  }

  deleteProcedure(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/procedures/${id}`);
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  // Dev:  http://localhost:3000/api
  // Prod: https://or-guide-api.onrender.com/api
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${this.baseUrl}/procedures`);
  }

  getById(id: string): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.baseUrl}/procedures/${id}`);
  }

  createProcedure(proc: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`${this.baseUrl}/procedures`, proc);
  }

  updateProcedure(proc: Procedure): Observable<Procedure> {
    if (!proc.id) {
      return throwError(() => new Error('Procedure id is required.'));
    }
    return this.http.put<Procedure>(
      `${this.baseUrl}/procedures/${proc.id}`,
      proc
    );
  }

  deleteProcedure(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/procedures/${id}`);
  }
}

