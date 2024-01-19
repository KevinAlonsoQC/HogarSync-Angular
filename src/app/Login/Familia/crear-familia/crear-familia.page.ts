import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService  } from '../../../Servicios/service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-familia',
  templateUrl: './crear-familia.page.html',
  styleUrls: ['./crear-familia.page.scss'],
})
export class CrearFamiliaPage implements OnInit {

  public formulario!: FormGroup|any;
  constructor(private _builder: FormBuilder, private router: Router, private api: ApiService, private alertController: AlertController) {
  }

  ionViewWillEnter(){
  }

  ngOnInit() {
    this.formulario = this._builder.group({
      nombre_familia: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
    })
  }

  campo(control: string) {
    return this.formulario.get(control);
  }

  fueTocado(control: string){
    return this.formulario.get(control)?.dirty;
  }

  estaSucio(control: string){
    return this.formulario.get(control)?.dirty;
  }

  saveFamilia(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
  
    const datosAdicionales = {
      admin_familia: Number(localStorage.getItem('infoUser'))
    };

    this.api.AddFamilia({
      ...this.formulario.value,
      ...datosAdicionales,
    }).subscribe(
      (resultado: any) => {
        this.formulario.reset();
        this.formulario.updateValueAndValidity();
    
        // Obtén el ID de la nueva familia creada
        const nuevaFamiliaId = resultado.id;
    
        // Actualiza el usuario agregando el ID de la nueva familia al array
        const usuarioId = Number(localStorage.getItem('infoUser'));
        this.api.CallBack_One_Usuario(usuarioId).subscribe((usuario: any) => {
          // Verifica si 'familias' es un array, si no, inicialízalo como un array vacío
          usuario.familias = Array.isArray(usuario.familias) ? usuario.familias : [];
    
          // Agrega el ID de la nueva familia al array 'familias' si aún no está presente
          if (!usuario.familias.includes(nuevaFamiliaId)) {
            usuario.familias.push(nuevaFamiliaId);
          }
    
          // Actualiza el usuario con el nuevo array 'familias'
          this.api.UpdateUsuario(usuarioId, usuario).subscribe();
          this.router.navigateByUrl('/inicio');
          this.mostrarAlerta('Has creado una nueva familia');
        });
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        this.mostrarAlerta('Hubo un error al procesar la solicitud.');
      }
    );
    

    
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  

}
