import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Servicios/service.service';
import { FunctionsService } from 'src/app/Servicios/functions.service';
import { AlertController } from '@ionic/angular';
import { UsuarioID } from '../../../Modelos/usuario';

@Component({
  selector: 'app-listar-miembros',
  templateUrl: './listar-miembros.page.html',
  styleUrls: ['./listar-miembros.page.scss'],
})
export class ListarMiembrosPage implements OnInit {
  public nombre_familia: string = 'Tu familia';
  private idFamilia: number|any;
  public miembros: UsuarioID[] = [];
  public idUser = Number(localStorage.getItem('infoUser'));

  constructor(
    private router: Router,
    private ruteador: ActivatedRoute,
    private api: ApiService,
    private functions: FunctionsService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.idFamilia = Number(this.ruteador.snapshot.paramMap.get('idFamilia'));
    this.api.CallBack_One_Familia(this.idFamilia).subscribe((producto: any) => {
      if (producto) {
        this.nombre_familia = producto.nombre_familia;
        this.api.CallBack_Usuarios().subscribe((usuarios: UsuarioID[]) => {
          if (usuarios) {
            this.miembros = usuarios.filter(usuario => usuario.familias.includes(this.idFamilia));
          }
        });
      }
    });
  }

  async removeMember(pro: UsuarioID){
    const alert = await this.alertController.create({
      header: '¿Seguro que deseas eliminar a '+pro.nombre+' '+pro.apellido+' de tu núcleo familiar '+this.nombre_familia+'?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            try {
              const index = (pro.familias as number[]).indexOf(this.idFamilia);
              if (index !== -1) {
                (pro.familias as number[]).splice(index, 1); // Elimina el ID de idFamilia
                await this.api.UpdateUsuario(pro.id, pro).toPromise();
                this.functions.msj(`Eliminaste a ${pro.nombre} ${pro.apellido} de tu núcleo familiar ${this.nombre_familia}`);
              } else {
                this.functions.msj('El miembro no pertenece a la familia.');
              }

              this.actualizarMiembros();
            } catch (error) {
              this.functions.msj('Error al eliminar al miembro de la familia');
              console.error('Error al actualizar el usuario:', error);
            }
          },
          
        },
      ],
    });

    await alert.present();
  }


  actualizarMiembros(){
    this.api.CallBack_One_Familia(this.idFamilia).subscribe((producto: any) => {
      if (producto) {
        this.nombre_familia = producto.nombre_familia;
        this.api.CallBack_Usuarios().subscribe((usuarios: UsuarioID[]) => {
          if (usuarios) {
            this.miembros = usuarios.filter(usuario => usuario.familias.includes(this.idFamilia));
          }
        });
      }
    });
  }

  volver() {
    this.router.navigate(['/listar-familias']);
  }
}
