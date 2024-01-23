import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Servicios/service.service';
import { FunctionsService } from 'src/app/Servicios/functions.service';
import { AlertController } from '@ionic/angular';
import { JobID, JobOp } from 'src/app/Modelos/job';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.page.html',
  styleUrls: ['./listar-tareas.page.scss'],
})
export class ListarTareasPage implements OnInit {
  public nombre_familia: string = 'Tu familia';
  public tareas: any
  private idFamilia: number|any;

  
  constructor(
    private router: Router,
    private ruteador: ActivatedRoute,
    private api: ApiService,
    private functions: FunctionsService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.idFamilia = Number(this.ruteador.snapshot.paramMap.get('idFamilia'));
    this.api.CallBack_One_Familia(this.idFamilia).subscribe(producto => {
      if (!producto) {
        console.error('No se encontró la familia');
        this.functions.msj('Ocurrió un error.');
        this.router.navigate(['/listar-familias']); // Otra página si el objeto no se encuentra
      } else {
        this.nombre_familia = producto.nombre_familia;
        this.api.CallBack_All_Tareas().subscribe(tareas => {
          if (tareas) {
            // Filtrar las tareas por el número de familia
            this.tareas = tareas.filter(tarea => tarea.familia === this.idFamilia);       
          }
        });
      }
    });
  }
  

  async create_task() {
    const alert = await this.alertController.create({
      header: 'Ingresa los datos de tu tarea',
      inputs: [
        {
          name: 'nombre_tarea',
          type: 'text',
          min: 6,
          max: 30,
          placeholder: 'Lavar Platos Sucios',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Crear',
          handler: async (data) => {
            const nuevaTarea = {
              nombre_tarea: data.nombre_tarea,
              familia: this.idFamilia,
            };

            // Llamada a la API para crear la tarea
            this.api.AddTarea(nuevaTarea).subscribe(
              (respuesta) => {
                this.actualizarPage();
                this.functions.msj('Tarea creada con éxito');
              },
              (error) => {
                this.functions.msj('Error al crear la tarea');
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  actualizarPage(){
    this.api.CallBack_All_Tareas().subscribe(tareas => {
      if (tareas) {
        // Filtrar las tareas por el número de familia
        this.tareas = tareas.filter(tarea => tarea.familia === this.idFamilia);       
      }
    });
  }

  async modificarTarea(pro:JobID){
    const alert = await this.alertController.create({
      header: 'Actualiza los datos de tu tarea',
      inputs: [
        {
          name: 'nombre_tarea',
          type: 'text',
          min: 6,
          max: 30,
          placeholder: 'Lavar Platos Sucios',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Actualizar',
          handler: async (data) => {
            const nuevaTarea = {
              nombre_tarea: data.nombre_tarea,
              familia: this.idFamilia,
            };

            // Llamada a la API para crear la tarea
            this.api.UpdateTareasId(pro.id, nuevaTarea).subscribe(
              (respuesta) => {
                this.actualizarPage();
                this.functions.msj('Tarea actualizada con éxito');
              },
              (error) => {
                this.functions.msj('Error al actualizar la tarea');
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarTarea(pro:JobID){
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres eliminar '+pro.nombre_tarea+' del núcleo '+this.nombre_familia+'?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            // Llamada a la API para crear la tarea
            this.api.DeleteTareasId(pro.id).subscribe(
              (respuesta) => {
                this.actualizarPage();
                this.functions.msj('Tarea eliminada con éxito');
              },
              (error) => {
                this.functions.msj('Error al eliminar la tarea');
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  volver(){
    this.router.navigate(['/listar-familias'])
  }

}
