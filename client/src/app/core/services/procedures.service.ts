import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { map } from 'rxjs/operators';

const STORAGE_KEY = 'orref:procedures';

@Injectable({ providedIn: 'root' })
export class ProceduresService {
  private url = '/assets/procedures.json';
  private store$ = new BehaviorSubject<Procedure[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitial();
  }

  private loadInitial() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Procedure[] = JSON.parse(raw);
        this.store$.next(parsed);
        return;
      }
    } catch (e) {
      console.warn('Failed reading procedures from storage, loading from assets', e);
    }

    this.http.get<Procedure[]>(this.url).subscribe({
      next: list => {
        this.store$.next(list || []);
      },
      error: err => {
        console.warn('Failed to load procedures.json', err);
        this.store$.next([]); // empty list so UI works
      }
    });
  }

  getAll(): Observable<Procedure[]> {
    return this.store$.asObservable();
  }

  getById(id: string): Observable<Procedure | undefined> {
    return this.store$.pipe(map(list => list.find(p => p.id === id)));
  }

  updateProcedure(updated: Procedure): Observable<Procedure> {
    const list = [...(this.store$.value ?? [])];
    const idx = list.findIndex(p => p.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.push(updated);
    }
    this.store$.next(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save procedures to localStorage', e);
    }
    return of(updated);
  }

  saveAll(list: Procedure[]) {
    this.store$.next(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save procedures to localStorage', e);
    }
  }
}
