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

  /** Fetch all procedures */
  getAll(): Observable<Procedure[]> {
    return this.store$.asObservable();
  }

  /** Get one by ID */
  getById(id: string): Observable<Procedure | undefined> {
    const found = this.store$.value.find(p => p.id === id);
    return of(found);
  }

  /** Update existing */
  updateProcedure(proc: Procedure): Observable<Procedure> {
    const list = this.store$.value.map(p => (p.id === proc.id ? proc : p));
    this.store$.next(list);
    this.save(list);
    return of(proc);
  }

  /** Add new procedure */
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
