import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Welcome to CRM Frontend</h1>
    <nav>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      nav {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      a.active {
        font-weight: bold;
      }
    `,
  ],
})
export class AppComponent { }
