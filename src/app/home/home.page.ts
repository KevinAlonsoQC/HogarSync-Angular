import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../Servicios/service.service';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import { UsuarioID } from '../Modelos/usuario';

//import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private usuarios: Array<UsuarioID> = [];
  private sesion = false

  public loginFormModel = {
    email: '',
    password: '',
  };

  constructor(    
    private router: Router,
    private alertController: AlertController,
    private api: ApiService,
  ) {

  }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.api.CallBack_Usuarios().subscribe(callback => (this.usuarios = callback))
  }

  login(loginForm: NgForm) {    
    // Verifica si el formulario es válido antes de enviar la solicitud
    if (loginForm.valid) {
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      for(let info of this.usuarios){
        if(info.correo === email && info.password === password ){
          this.sesion = true
          localStorage.setItem('infoUser', String(info.id));
          localStorage.setItem('ingresado', 'true')
          this.router.navigateByUrl('inicio')
          break
        }
      }
      if(!this.sesion){
        this.msj('Email y/o contraseña incorrecta.')
      }
    } else {
      this.msj('Ingresa los datos correctamente.')
    }
  }
  
  register(){
    this.router.navigateByUrl('register')
  }

  async msj(msg: string) {
    const alertError = await this.alertController.create({
      header: msg,

      buttons: [
        {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'danger',
        },
      ]
    });
    await alertError.present();
  }

}
