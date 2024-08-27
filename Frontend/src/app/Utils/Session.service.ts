import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { User } from '../Shared/User';
@Injectable({
  providedIn: 'root'
})
export class SessionService {


  private readonly SESSION_KEY = 'userData';
  constructor(private router: Router) {}

  get User(): User {
    const storedData = sessionStorage.getItem(this.SESSION_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  set User(value: User) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(value));
  }

  sessionStart(user: User) {
    this.User = user;
  }

  sessionDestroy() {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['']);
  }

  hasSession(): boolean {
    return this.User !== null;
  }
}
