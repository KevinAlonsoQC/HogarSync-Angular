import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Servicios/service.service';
import { FunctionsService } from 'src/app/Servicios/functions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})

export class ModificarUsuarioPage implements OnInit {

  private usuario: any;
  public formulario!: FormGroup|any;
  public changePassword: boolean = false;

  
  constructor(
    private api:ApiService,
    private router: Router,
    private _builder: FormBuilder,
    private functions: FunctionsService
  ) { 
    
  }

  ngOnInit() {
    this.api.CallBack_One_Usuario(Number(localStorage.getItem('infoUser'))).subscribe(callback => {
      if(callback){
        this.usuario = callback;
        this.formulario.setValue({
          ...callback
        });
        this.formulario.updateValueAndValidity();
      }
      else{
        this.router.navigate(['']);
      }
    })

    this.formulario = this._builder.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      apellido: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      passwordNew: ['',[Validators.minLength(8)]],

    })
  }

  public campo(control: string) {
    return this.formulario.get(control);
  }
  public fueTocado(control: string){
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formulario.get(control).dirty;
  }


  // Método para cambiar el estado de la variable booleana
  cambiarPassword() {
    this.changePassword = !this.changePassword;
  }

  public modificar(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    // Obtener el valor de passwordNew y password del formulario
    const change_password = this.formulario.get('password').value;
    const new_password = this.formulario.get('passwordNew').value;

    if(this.usuario.password === change_password){
      if (new_password.trim() !== '') {
        this.formulario.value.password = new_password
      }     
      const { passwordNew, ...datosUsuario } = this.formulario.value;
      this.api.UpdateUsuario(Number(localStorage.getItem('infoUser')),datosUsuario).subscribe(datos => {
        if(datos){
          this.functions.msj('Cuenta Actualizada')
          this.router.navigateByUrl('inicio')
        }
      })
    }else{
      this.functions.msj('Ingresa tu Contraseña Actual para guardar los cambios')
    }
    
  }

  volver(){
    this.functions.volverPage();
  }
  
}
