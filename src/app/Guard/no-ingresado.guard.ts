import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const infoUser = localStorage.getItem('infoUser');

    if (!infoUser) {
      // User is not logged in, allow access to the route
      return true;
    } else {
      // User is already logged in, navigate to the home page or another appropriate route
      this.router.navigateByUrl('/inicio');
      return false;
    }
  }
}
