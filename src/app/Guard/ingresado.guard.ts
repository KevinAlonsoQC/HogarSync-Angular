import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const infoUser = localStorage.getItem('infoUser');

    if (infoUser) {
      // You might want to check if infoUser contains valid user information
      return true;
    } else {
      // Navigate to the login page or another appropriate route
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
