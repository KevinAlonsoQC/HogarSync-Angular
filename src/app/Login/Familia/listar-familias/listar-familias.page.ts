import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Servicios/service.service';
import { FunctionsService } from '../../../Servicios/functions.service';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FamiliaID } from 'src/app/Modelos/familia';

@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.page.html',
  styleUrls: ['./listar-familias.page.scss'],
})
export class ListarFamiliasPage implements OnInit {

  public familias: Array<FamiliaID> = [];
  public texto_carga: string = "Trayendo más para ti <3";
  private usuario: any;

  constructor(
    private router: Router, 
    private api: ApiService, 
    private alertController: AlertController, 
    private functions: FunctionsService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
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

  async modificarFamilia(pro: FamiliaID) {
    const alert = await this.alertController.create({
      header: 'Actualiza los datos de tu Núcleo Familiar',
      inputs: [
        {
          name: 'nombre_familia',
          type: 'text',
          min: 3,
          max: 30,
          placeholder: 'Nombre del Núcleo',
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
            const nuevaFamilia = {
              nombre_familia: data.nombre_familia,
              admin_familia: Number(localStorage.getItem('infoUser')),
            };

            // Llamada a la API para crear la tarea
            this.api.UpdateFamiliaId(pro.id, nuevaFamilia).subscribe(
              (respuesta) => {
                this.actualizarFamilias();
                this.functions.msj('Familia actualizada con éxito');
              },
              (error) => {
                this.functions.msj('Error al actualizar la Familia');
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  administraFamilia(pro: FamiliaID) {
    this.router.navigate(['/administrar-familia', pro.id]);
  }
  
  async create_family() {
    const alert = await this.alertController.create({
      header: 'Completa los campos',
      inputs: [
        {
          name: 'nombre_familia',
          type: 'text',
          min: 3,
          max: 30,
          placeholder: 'Nombre del Núcleo',
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
            const nuevaFamilia = {
              nombre_familia: data.nombre_familia,
              admin_familia: Number(localStorage.getItem('infoUser')),
            };
  
            try {
              // Crea la nueva familia y obtén el resultado
              const resultado: any = await this.api.AddFamilia({
                ...nuevaFamilia
              }).toPromise();
            
              // Obtén el ID de la nueva familia creada
              const nuevaFamiliaId = resultado.id;
            
              // Actualiza el usuario agregando el ID de la nueva familia al array
              const usuarioId = Number(localStorage.getItem('infoUser'));
              const usuario: any = await this.api.CallBack_One_Usuario(usuarioId).toPromise();
            
              // Verifica si 'familias' es un array, si no, inicialízalo como un array vacío
              usuario.familias = Array.isArray(usuario.familias) ? usuario.familias : [];
            
              // Agrega el ID de la nueva familia al array 'familias' si aún no está presente
              if (!usuario.familias.includes(nuevaFamiliaId)) {
                usuario.familias.push(nuevaFamiliaId);
              }
            
              // Actualiza el usuario con el nuevo array 'familias'
              await this.api.UpdateUsuario(usuarioId, usuario).toPromise();
  
              // Ahora que la operación de creación y actualización ha tenido éxito,
              // actualiza las familias y muestra el mensaje
              await this.actualizarFamilias();
              this.functions.msj('Has creado una nueva familia');
            } catch (error) {
              console.error('Error al registrar el usuario:', error);
              this.functions.msj('Hubo un error al procesar la solicitud.');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }


  async eliminarFamilia(pro: FamiliaID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Eliminar esta Familia?',
      subHeader: pro.nombre_familia + ' #' + pro.id,
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
              
              // Obtener todos los usuarios
              const usuarios = await this.api.CallBack_Usuarios().toPromise();

              // Actualizar cada usuario
              for (const usuario of usuarios) {
                if (usuario.familias && usuario.familias.includes(pro.id)) {
                  usuario.familias = (usuario.familias as number[]).filter(familiaId => familiaId !== pro.id);
                  await this.api.UpdateUsuario(usuario.id, usuario).toPromise();
                }
              }
  
              // Eliminar la familia
              await this.api.DeleteFamiliaId(pro.id).toPromise();
  
              // Actualizar la lista de familias en el componente
              this.actualizarFamilias();
  
              this.functions.msj('Has eliminado la familia ' + pro.nombre_familia);
            } catch (error) {
              console.error('Error al eliminar la familia:', error);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  async abandonarFamilia(pro: FamiliaID) {
    const userId = Number(localStorage.getItem('infoUser'));
    const alert = await this.alertController.create({
      header: '¿Seguro de Abandonar esta Familia?',
      subHeader: pro.nombre_familia + ' #' + pro.id,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Abandonar',
          handler: () => {
            this.usuario.familias = (this.usuario.familias as number[]).filter((familiaId: number) => familiaId !== pro.id);
            this.api.UpdateUsuario(userId, this.usuario).subscribe(() => {
              this.actualizarFamilias();
              this.functions.msj('Has abandonado la familia ' + pro.nombre_familia);
            });

          }
        }
      ]
    });
  
    await alert.present();
  }
  
  // Método para actualizar las familias
  async actualizarFamilias() {
    try {
      const datosActualizados: FamiliaID[] | undefined = await this.api.CallBack_All_Familias().toPromise();

      // Verifica si 'datosActualizados' está definido
      if (datosActualizados) {
        // Verifica si 'this.usuario' está definido y si tiene la propiedad 'familias'
        if (this.usuario && this.usuario.familias) {
          // Filtra los elementos que cumplen con la condición
          this.familias = datosActualizados.filter(item => this.usuario.familias.includes(item.id));

          // Añade la propiedad 'is_admin' a cada familia según el ID del usuario actual
          this.familias.forEach((familia: FamiliaID) => {
            familia.is_admin = familia.admin_familia === this.usuario.id;
          });
        }
      } else {
        console.error('Los datos de familias son undefined.');
        // Manejar el caso en que los datos son undefined según tus necesidades
      }
    } catch (error) {
      console.error('Error al actualizar las familias:', error);
      // Maneja el error de actualización de familias según sea necesario
    }
  }
}
