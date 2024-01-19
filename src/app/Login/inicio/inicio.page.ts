import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Servicios/service.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  private usuario: any;
  public nombre: string = "Prueba Prueba"
  public familia : string = "Quintrequeo"

  constructor(private router: Router, private api: ApiService, private alertController: AlertController, private ruteador:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.CallBack_One_Usuario(Number(localStorage.getItem('infoUser'))).subscribe(callback => {
      if(callback){
        this.usuario = callback;
        this.nombre = this.usuario.nombre +' '+ this.usuario.apellido;
      }
    })

  }

  logout(){
    localStorage.clear();
    this.msj('Has cerrado sesión')
    this.router.navigateByUrl('');
  }

  updateAccount(){
    this.router.navigateByUrl('/modificar-usuario');
  }

  manageFamilys(){
    this.router.navigateByUrl('/listar-familias');

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
