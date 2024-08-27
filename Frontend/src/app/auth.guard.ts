import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from './Utils/Session.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const protectedRoutes: string[] = ['/Ordinateurs'];

    // Check if the user is authenticated or has the necessary credentials
    const isAuthenticated: boolean = this.sessionService.hasSession();

    if (protectedRoutes.includes(state.url) && !isAuthenticated) {
      this.router.navigate(['']); 
      return false;
    }
    return true;
  }
}