import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Servicios/service.service';
import { FunctionsService } from 'src/app/Servicios/functions.service';
import * as uuid from 'uuid';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-administrar-familia',
  templateUrl: './administrar-familia.page.html',
  styleUrls: ['./administrar-familia.page.scss'],
})
export class AdministrarFamiliaPage implements OnInit {
  public nombre_familia: string = 'tu familia'
  private idFamilia: number|any;
  private familia: any;

  constructor(
    private api:ApiService,
    private router: Router,
    private functions: FunctionsService,
    private ruteador: ActivatedRoute,
    private renderer: Renderer2, private el: ElementRef,
    private alertController: AlertController
  ) { 
    
  }

  ngOnInit() {
    this.idFamilia = Number(this.ruteador.snapshot.paramMap.get('idFamilia'));
    this.api.CallBack_One_Familia(this.idFamilia).subscribe(
      (producto) => {
        if (producto) {
          this.familia = producto
          this.nombre_familia = producto.nombre_familia;
        }
      },
      (error) => {
        console.error('Error al obtener la familia:', error);
        this.functions.msj('Ocurrió un error al obtener la familia.');
        // Puedes manejar el error según tus necesidades
      }
    );
  }


  viewTasks(){
    this.router.navigate(['/listar-tareas', this.idFamilia])
  }

  viewMembers(){
    this.router.navigate(['/listar-miembros', this.idFamilia])

  }

  inviteMember() {
    const now = new Date();
  
    if (this.familia.token_link && new Date(this.familia.time_valid) > now) {
      this.showInviteOptions();
    } else {
      this.showInvite()
    }
  }
  
  // Método para mostrar opciones al usuario
  async showInvite() {
    const alert = await this.alertController.create({
      header: 'No hay link de invitación vigente',
      message: 'No hay un link de invitación vigente. ¿Qué deseas hacer?',
      buttons: [
        {
          text: 'Crear Link',
          handler: () => {
            this.updateInviteLink();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'success',
        },
      ]
    });
  
    await alert.present();
  }

  // Método para mostrar opciones al usuario
  async showInviteOptions() {
    const alert = await this.alertController.create({
      header: 'Link de invitación vigente',
      message: 'Ya hay un link de invitación vigente. ¿Qué deseas hacer?',
      buttons: [
        {
          text: 'Eliminar Link',
          handler: () => {
            this.deleteInviteLink();
          }
        },
        {
          text: 'Actualizar Link',
          handler: () => {
            this.updateInviteLink();
          }
        },
        {
          text: 'Conservar',
          role: 'cancel',
          cssClass: 'success',
        },
      ]
    });
  
    await alert.present();
  }
  
  // Método para eliminar el link de invitación
  private deleteInviteLink() {
    // Elimina token_link y time_valid localmente
    delete this.familia.token_link;
    delete this.familia.time_valid;
    // Lógica para eliminar el link (por ejemplo, establecer token_link y time_valid en null)
    const family = {
      nombre_familia: this.familia.nombre_familia,
      admin_familia: this.familia.admin_familia
    }
    this.api.UpdateFamiliaInvite(this.idFamilia, family).subscribe(
      () => {
        this.functions.msj('Se ha eliminado el link de invitación.');
      },
      (error) => {
        this.functions.msj('Error al eliminar el link de invitación.');
        console.error(error);
      }
    );
  }
  
  // Método para actualizar el link de invitación
  private updateInviteLink() {
    // Lógica para actualizar el link (puedes utilizar la misma lógica que en inviteMember)
    this.generate_link();
  }
  
  private generate_link(){
    const now = new Date();
    const token_link = uuid.v4();
    const time_valid = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

    // Actualiza localmente
    this.familia.token_link = token_link;
    this.familia.time_valid = time_valid;

    // Actualiza en el servidor
    this.api.UpdateFamiliaId(this.idFamilia, { token_link, time_valid }).subscribe(
      () => {
        this.functions.msj('Se ha generado y copiado el link de invitación. Durará un día. Si deseas crear uno nuevo, vuelve a presionar');
      },
      (error) => {
        this.functions.msj('Error al actualizar la familia en el servidor.');
        console.error(error);
      }
    );

    // Copia al portapapeles
    const input = this.renderer.createElement('input');
    input.value = `http://localhost:8100/unirse-familia/${this.idFamilia}/${token_link}`;
    this.renderer.appendChild(this.el.nativeElement, input);
    input.select();
    document.execCommand('copy');
    this.renderer.removeChild(this.el.nativeElement, input);
  }

  volver() {
    this.router.navigate(['/listar-familias']);
  }
}
