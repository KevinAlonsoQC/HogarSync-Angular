import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService  } from '../Servicios/service.service';
import { AlertController } from '@ionic/angular';
import { UsuarioID } from '../Modelos/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  private usuarios: Array<UsuarioID> = [];

  public formulario!: FormGroup|any;
  public registrado: boolean = false;

  constructor(private _builder: FormBuilder, private router: Router, private api: ApiService, private alertController: AlertController) {
    
  }

  ionViewWillEnter(){
    this.api.CallBack_Usuarios().subscribe(callback => (this.usuarios = callback))
  }

  ngOnInit() {
    this.formulario = this._builder.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      apellido: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
    })
  }

  campo(control: string) {
    return this.formulario.get(control);
  }

  fueTocado(control: string){
    return this.formulario.get(control)?.dirty;
  }

  estaSucio(control: string){
    return this.formulario.get(control)?.dirty;
  }

  saveUsuario(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
  
    const datosAdicionales = {
      msj_activo: true,
      es_admin: false,
      familias: []
    };
    
    var register_user=false
    for(let info of this.usuarios){
      if(info.correo === this.formulario.value.correo){
        register_user = true
        this.mostrarAlerta('Este correo ya está registrado.');
        break
      }
    }

    if(!register_user){
      this.api.AddUsuario({
        ...this.formulario.value,
        ...datosAdicionales,
      }).subscribe(
        (resultado: any) => {
          this.formulario.reset();
          this.formulario.updateValueAndValidity();
          this.registrado = true;
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
          this.mostrarAlerta('Hubo un error al procesar la solicitud.');
  
        }
      );
    }

    
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  
  
}