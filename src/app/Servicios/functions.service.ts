import { Injectable } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private menuCtrl: MenuController, 
    private alertController:AlertController,
    private navCtrl: NavController
  ){}

  closeMenu() {
    this.menuCtrl.close();
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

  volverPage() {
    this.menuCtrl.close();
    this.navCtrl.pop();
    this.navCtrl.back(); // o this.router.navigate(['/listar-familias']);

  }
}
