import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      return true; // Allow access
    } else {
      alert('You must log in to access the dashboard!');
      this.router.navigate(['/login']); // Redirect to login
      return false;
    }
  }
}
