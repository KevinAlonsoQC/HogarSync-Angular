import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Servicios/service.service';
import { FunctionsService } from '../../Servicios/functions.service';

import { Router } from '@angular/router';
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
  public imagenBase64 = '';

  constructor(private router: Router, private api: ApiService, private alertController: AlertController, private functions: FunctionsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.functions.closeMenu();  // Cierra el ion-menu
    this.api.CallBack_One_Usuario(Number(localStorage.getItem('infoUser'))).subscribe(callback => {
      if(callback){
        this.usuario = callback;
        this.nombre = this.usuario.nombre + ' ' + this.usuario.apellido
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

  historyList(prod:FamiliaID){
    this.router.navigate(['listar-historial',prod.id])
  }

  async click_task(pro:FamiliaID) {
    const now = new Date();
    const tareasDisponibles = await this.api.CallBack_All_Tareas().toPromise();
    if(!tareasDisponibles) {
      this.functions.msj('Error al obtener las tareas disponibles.');
      return;
    }

    const tareasFamilia = tareasDisponibles.filter(tarea => tarea.familia === pro.id);
    if(tareasFamilia.length <= 0) {
      this.functions.msj('Este núcleo no tiene Tareas creadas. Avísale al administrador del núcleo para que agregue.');
      return;
    }

    // Crea un arreglo de botones basado en las tareas disponibles
    const buttons = tareasFamilia.map(tarea => ({
      text: tarea.nombre_tarea,
      handler: async () => {
        const now = new Date();
        const currentMinute = now.getMinutes();
        const currentHour = now.getHours();
        const currentDate = now.getDate();
        const currentMonth = now.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso sumamos 1
        const currentYear = now.getFullYear();
        
        // Asegurémonos de que todos los valores tengan dos dígitos agregando ceros a la izquierda si es necesario
        const formattedDate = `${currentHour}:${currentMinute} ${String(currentDate).padStart(2, '0')}/${String(currentMonth).padStart(2, '0')}/${currentYear}`;

        const tarea_realizada = {
            tarea: tarea.nombre_tarea, //ID de la tarea realizada
            familia: pro.id, //id de la familia en la cual se realizó
            usuario: this.nombre, //id del usuario que la realizó
            fecha_hora: formattedDate
          }
          this.agregarTarea(tarea_realizada);
      }
    }));
    const alert = await this.alertController.create({
      header: 'Núcleo Familiar '+pro.nombre_familia,
      message: 'Estas son las tareas disponibles. Escoge la que realizaste hoy.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        ...buttons
      ],
    });
  
    await alert.present();
  }

  async agregarTarea(tarea_realizada: any) {
    try {
      const imagenArchivo = await this.seleccionarArchivo();
  
      if (imagenArchivo) {
        const imagenBase64 = await this.cargarFotoDesdeArchivo(imagenArchivo);
        tarea_realizada.imagen = imagenBase64;
  
        this.api.AddTareas_Realizadas(tarea_realizada).subscribe((datos) => {
          if (datos) {
            this.functions.msj('¡Tarea Realizada!');
          } else {
            this.functions.msj('Hubo un error al parecer.');
          }
        });
      } else {
        console.error('No se seleccionó ningún archivo.');
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error);
      this.functions.msj('Hubo un error al agregar la tarea.');
    }
  }
  
  private seleccionarArchivo(): Promise<File | null> {
    return new Promise((resolve) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
  
      const changeHandler = (event: Event) => {
        const files = (event.target as HTMLInputElement)?.files;
        resolve(files?.length ? files[0] : null);
        document.body.removeChild(fileInput);
      };
  
      fileInput.addEventListener('change', changeHandler);
      document.body.appendChild(fileInput);
      fileInput.click();
    });
  }
  
  private cargarFotoDesdeArchivo(archivo: File): Promise<string | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result as string);
      };
  
      reader.readAsDataURL(archivo);
    });
  }
  
}
