/*
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

const THEME_KEY = 'orref:theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="site-header">
      <div class="container">
        <a class="brand" routerLink="/">OR Setup Reference</a>
        <nav>
          <a class="nav-link" routerLink="/procedures">Procedures</a>
          <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-pressed]="isDark"> 
            {{ isDark ? '☾ Dark' : '☼ Light' }}
          </button>
        </nav>
      </div>
    </header>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <div class="container">Built for Surgical Tech learning • Demo</div>
    </footer>
  `,
  styles: [`
    :host { display:block; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color:var(--text); background:var(--bg); }
    .container { max-width:1100px; margin:0 auto; padding:0 16px; }
    .site-header { border-bottom:1px solid var(--muted-border); background:var(--header); position:sticky; top:0; z-index:20; }
    .site-header .container { display:flex; align-items:center; justify-content:space-between; height:64px; }
    .brand { font-weight:700; text-decoration:none; color:var(--text); }
    nav .nav-link { margin-left:12px; text-decoration:none; color:var(--muted); }
    .theme-toggle { margin-left:12px; padding:6px 10px; border-radius:8px; border:1px solid var(--muted-border); background:var(--card); color:var(--text); cursor:pointer; }
    .site-footer { margin-top:40px; padding:20px 0; color:var(--muted); text-align:center; border-top:1px solid var(--muted-border); }
    main.container { padding:24px 16px; min-height:60vh; }
  `]
})
export class AppComponent {
  isDark = false;

  constructor() {
    this.isDark = (localStorage.getItem(THEME_KEY) === 'dark');
    this.apply();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem(THEME_KEY, this.isDark ? 'dark' : 'light');
    this.apply();
  }

  private apply() {
    const root = document.documentElement;
    if (this.isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }
}
*/

/*
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OR Setup Reference';
  isDark = true;

  constructor() {
    // initialize theme from system or previous preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.isDark = saved === 'dark';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
}
*/


// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OR Setup Reference';
  isDark = true;

  constructor() {
    // read saved preference (fall back to true for dark)
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.isDark = saved === 'dark';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    // use .dark class because your global styles rely on `.dark { --var: ... }`
    const root = document.documentElement;
    if (this.isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }
}
