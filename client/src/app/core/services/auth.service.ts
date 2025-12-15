/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

type LoginResponse = {
  token: string;
  user: { id: string; email: string; name?: string };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'or_guide_token';
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, {
      email,
      password
    }).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
*/

/* something went fubar
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

type LoginResponse = {
  token: string;
  user: { id: string; email: string; name?: string };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'or_guide_token';

  // IMPORTANT: your environment uses apiUrl, not apiBaseUrl
  // apiUrl should already include "/api"
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(tap(res => this.setToken(res.token)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
*/

/*
// client/src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

type LoginResponse = {
  token: string;
  user: { id: string; email: string; name?: string };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'or_guide_token';
  private readonly baseUrl = environment.apiUrl; // ✅ use apiUrl (what you actually have)

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    // If baseUrl already includes "/api", use "/auth/login"
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(tap(res => this.setToken(res.token)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

type LoginResponse = {
  token: string;
  user: { id: string; email: string; name?: string };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'or_guide_token';
  private readonly baseUrl = environment.apiUrl; // ✅ correct

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(tap(res => this.setToken(res.token)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
