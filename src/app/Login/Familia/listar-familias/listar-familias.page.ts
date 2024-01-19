import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../Servicios/service.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FamiliaID } from 'src/app/Modelos/familia';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.page.html',
  styleUrls: ['./listar-familias.page.scss'],
})
export class ListarFamiliasPage implements OnInit {
  @ViewChild(IonInfiniteScroll)

  public scroll!: IonInfiniteScroll;
  public familias: Array<FamiliaID> = [];
  public texto_carga: string = "Trayendo más para ti <3";
  private usuario: any;

  constructor(private router: Router, private api: ApiService, private alertController: AlertController, private ruteador:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.CallBack_One_Usuario(Number(localStorage.getItem('infoUser'))).subscribe(callback => {
      if(callback){
        this.usuario = callback;
      }
    })

    this.api.CallBack_Familias()
    this.api.$Familias_Lista.subscribe(datosActualizados => {
      // Verifica si 'this.usuario' está definido y si tiene la propiedad 'familias'
      if (this.usuario && this.usuario.familias) {
        // Filtra los elementos que cumplen con la condición
        this.familias = datosActualizados.filter(item => this.usuario.familias.includes(item.id));

        // Añade la propiedad 'is_admin' a cada familia según el ID del usuario actual
        this.familias.forEach(familia => {
          familia.is_admin = familia.admin_familia === this.usuario.id;
        });
      }
    
      // Completar el Infinite Scroll si está definido
      if (this.scroll) {
        this.scroll.complete();
      }
    });
    
  }

  eliminarFamilia(familia: FamiliaID) {
    // Agrega lógica para eliminar la familia según tus requisitos
  }
  
  modificarFamilia(familia: FamiliaID) {
    // Agrega lógica para modificar la familia según tus requisitos
  }
  
  
  cargarMasDatos(){
    this.api.CallBack_More_Familias();
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
    
  }


  async create_family() {
    const alert = await this.alertController.create({
      header: '¿Quieres crear un núcleo familiar?',
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Si',
            handler: () => {
              this.router.navigateByUrl('/crear-familia');
            }
        }
    ]
    });

    await alert.present();
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


  async delete_producto(pro: FamiliaID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Eliminar esta Familia?',
      subHeader: pro.nombre_familia+' #'+pro.id,
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Eliminar',
            handler: () => {
              this.api.DeleteFamiliaId(pro.id).subscribe();
              this.router.navigateByUrl('/inicio');
            }
        }
    ]
    });

    await alert.present();
  }

  async update_producto(pro: FamiliaID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Editar esta Familia?',
      subHeader: pro.nombre_familia+' #'+pro.id,
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Editar',
            handler: () => {
              this.ruteador.params.subscribe((params : Params) => {
                this.router.navigate(['/modificar-familia', pro.id])
              });
            }
        }
    ]
    });

    await alert.present();
  }

}
