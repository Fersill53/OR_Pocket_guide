import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BacktableSetup } from '../models/backtable-setup.models';

type CreateBacktablePayload = {
    caseName: string;
    surgeonName: string;
    gownsAndGloves: string[];
    drapes: string[];
    instrumentTrays: string[];
    medications: string[];
};

@Injectable({ providedIn: 'root' })
export class BacktableSetupService {
    private readonly baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    list(): Observable<BacktableSetup[]> {
        return this.http.get<BacktableSetup[]>(`${this.baseUrl}/api/backtable-setups`);
    }

    get(id: string): Observable<BacktableSetup> {
        return this.http.get<BacktableSetup>(`${this.baseUrl}/api/backtable-setups/${id}`);
    }

    create(payload: CreateBacktablePayload, files: File[]): Observable<BacktableSetup> {
        const fd = new FormData();
        fd.append('payload', JSON.stringify(payload));
        (files || []).forEach(f => fd.append('photos', f));
        return this.http.post<BacktableSetup>(`${this.baseUrl}/api/backtable-setups/`, fd);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/backtable-setups/${id}`);
    }
}