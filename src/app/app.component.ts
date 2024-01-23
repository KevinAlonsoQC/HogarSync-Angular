import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from './Servicios/functions.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private functions:FunctionsService,
    private router: Router
  ){}

  logout(){
    localStorage.clear();
    this.functions.msj('Has cerrado sesión')
    this.functions.closeMenu();
    this.router.navigateByUrl('');
  }

  home(){
    this.functions.closeMenu();
    this.router.navigateByUrl('/inicio');
  }

  updateAccount(){
    this.functions.closeMenu();
    this.router.navigateByUrl('/modificar-usuario');
  }

  manageFamilys(){
    this.functions.closeMenu();
    this.router.navigateByUrl('/listar-familias');
  }
}
