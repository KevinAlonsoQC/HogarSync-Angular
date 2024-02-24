import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Servicios/service.service';
import { FunctionsService } from 'src/app/Servicios/functions.service';
import { AlertController } from '@ionic/angular';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-listar-historial',
  templateUrl: './listar-historial.page.html',
  styleUrls: ['./listar-historial.page.scss'],
})
export class ListarHistorialPage implements OnInit {
  private idFamilia: number | any;

  public nombre_familia: string = 'Tu familia';  
  public isAdminFamily: boolean = false;
  public tareas: any;

  constructor(
    private router: Router,
    private ruteador: ActivatedRoute,
    private api: ApiService,
    private functions: FunctionsService,
    private alertController: AlertController,
  ) { }

  ngOnInit(){}

  ionViewWillEnter() {
    this.idFamilia = Number(this.ruteador.snapshot.paramMap.get('idFamilia'));
    this.actualizarLista();
  }

  actualizarLista(){
    this.api.CallBack_One_Familia(this.idFamilia).pipe(
      tap(producto => {
        if (!producto) {
          console.error('No se encontró la familia');
          this.functions.msj('Ocurrió un error.');
          this.router.navigate(['/listar-familias']); // Otra página si el objeto no se encuentra
        } else {
          this.nombre_familia = producto.nombre_familia;
          this.isAdminFamily = Number(producto.admin_familia) === Number(localStorage.getItem('infoUser'));
        }
      }),
      switchMap(() => this.api.CallBack_All_Tareas_Realizadas())
    ).subscribe(tareas => {
      if (tareas) {
        // Filtrar las tareas realizadas por el número de familia
        this.tareas = tareas.filter(tarea => tarea.familia === this.idFamilia);       
      }
    });
  }

  ordenarTareasPorId(tareas: any[]): any[] {
    return tareas.sort((a, b) => {
      return b.id - a.id; // Ordenar de forma descendente por ID
    });
  }
  
  
  async eliminarHistorial(pro: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Eliminar esta tarea del historial?',
      subHeader: pro.nombre_persona + ' #' + pro.id,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              // Eliminar la familia
              await this.api.DeleteTareas_RealizadasId(pro.id).toPromise();
  
              // Actualizar la lista de familias en el componente
              this.actualizarLista();
  
              this.functions.msj('Has eliminado la tarea ' + pro.id + ' del historial. Realizada por '+ pro.nombre_persona);
            } catch (error) {
              console.error('Error al eliminar la tarea del historial:', error);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  volver(){
    this.router.navigate(['/inicio']);
  }

}
