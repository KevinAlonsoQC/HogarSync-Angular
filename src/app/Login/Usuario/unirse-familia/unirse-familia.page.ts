import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService } from 'src/app/Servicios/functions.service';
import { ApiService } from 'src/app/Servicios/service.service';

@Component({
  selector: 'app-unirse-familia',
  template: `<p>{{ mensaje }}</p>`,
  styleUrls: ['./unirse-familia.page.scss'],
})
export class UnirseFamiliaPage implements OnInit {
  public mensaje: string = '';
  private idFamilia: number | any;
  private token: string | any;
  private idUser = Number(localStorage.getItem('infoUser'));

  constructor(
    private ruteador: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private functions: FunctionsService
  ) {}

  async ngOnInit() {
    if (this.idUser) {
      this.idFamilia = Number(this.ruteador.snapshot.paramMap.get('idFamilia'));
      this.token = this.ruteador.snapshot.paramMap.get('token');
      if (await this.isValidToken(this.token)) {
        if (await this.isValidExpiration()) {
          const usuario: any = await this.api.CallBack_One_Usuario(this.idUser).toPromise();
          usuario.familias = Array.isArray(usuario.familias) ? usuario.familias : [];

          // Agrega el ID de la nueva familia al array 'familias' si aún no está presente
          if (!usuario.familias.includes(this.idFamilia)) {
            usuario.familias.push(this.idFamilia);
            // Actualiza el usuario con el nuevo array 'familias'
            await this.api.UpdateUsuario(this.idUser, usuario).toPromise();
            this.mensaje = 'Te has unido con éxito'
          }else{
            this.mensaje = 'Ya eres miembro de esta familia.'
          }
        } else {
          this.mensaje = 'El enlace ha caducado.';
        }
      } else {
        this.mensaje = 'El enlace es inválido.';
      }
    } else {
      this.functions.msj('Primero debes iniciar sesión');
      this.router.navigate(['']);
    }
  }

  // Método para verificar el token (puedes ajustar según tus necesidades)
  private async isValidToken(token: string): Promise<boolean> {
    const item = await this.api.CallBack_One_Familia(this.idFamilia).toPromise();
    console.log(item ? token === item.token_link : false)
    return item ? token === item.token_link : false;
  }

  // Método para verificar la fecha de vencimiento
  private async isValidExpiration(): Promise<boolean> {
    const item = await this.api.CallBack_One_Familia(this.idFamilia).toPromise();
    return item && item.time_valid ? new Date(item.time_valid) > new Date() : false;
  }

  
}
