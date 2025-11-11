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
    */

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

