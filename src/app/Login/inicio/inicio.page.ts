import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Servicios/service.service';
import { FunctionsService } from '../../Servicios/functions.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FamiliaID } from 'src/app/Modelos/familia';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  private usuario: any;
  public familias: Array<FamiliaID> = [];
  public nombre: string = "Prueba Prueba"

  constructor(private router: Router, private api: ApiService, private alertController: AlertController, private ruteador:ActivatedRoute, private functions: FunctionsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.functions.closeMenu();  // Cierra el ion-menu
    this.api.CallBack_One_Usuario(Number(localStorage.getItem('infoUser'))).subscribe(callback => {
      if(callback){
        this.usuario = callback;
        this.api.CallBack_All_Familias().subscribe(datosActualizados => {
          // Verifica si 'this.usuario' está definido y si tiene la propiedad 'familias'
          if (this.usuario && this.usuario.familias) {
            // Filtra los elementos que cumplen con la condición
            this.familias = datosActualizados.filter(item => this.usuario.familias.includes(item.id));
    
            // Añade la propiedad 'is_admin' a cada familia según el ID del usuario actual
            this.familias.forEach(familia => {
              familia.is_admin = familia.admin_familia === this.usuario.id;
            });
          }
        });
      }
    })

  }
  
}
