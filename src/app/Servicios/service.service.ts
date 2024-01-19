import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Usuario, UsuarioID, UsuarioOp } from '../Modelos/usuario';
import { Familia, FamiliaID, FamiliaOp } from '../Modelos/familia';
import { JobID, Job, JobOp } from '../Modelos/job';
import { TareaRealizada, TareaRealizadaID, TareaRealizadaOp  } from '../Modelos/tarearealizada';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json;charset=utf-8'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private url_api = 'http://localhost:5000';

  NowPage = 1;

  private cache_Familias = new BehaviorSubject<Array<FamiliaID>>([]);
  $Familias_Lista = this.cache_Familias.asObservable();

  constructor(private http:HttpClient) { }

  //Usuarios
  CallBack_Usuarios(): Observable<any>{
    return this.http.get<Array<UsuarioID>>(`${this.url_api}/usuario`);
  }

  CallBack_One_Usuario(id: number): Observable<UsuarioID[]> {
    return this.http.get<UsuarioID[]>(`${this.url_api}/usuario/${id}`);
  }

  AddUsuario(user: Usuario){
    return this.http.post(`${this.url_api}/usuario`, user, httpOptions);
  }

  DeleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.url_api}/usuario/${id}`);
  }

  UpdateUsuario(id: number, payload: UsuarioOp): Observable<any>{
    return this.http.patch(`${this.url_api}/usuario/${id}`, payload, httpOptions)
  }


  //Familia
  CallBack_All_Familias(){
    return this.http.get<Array<FamiliaID>>(this.url_api);
  }

  CallBack_Familias(){
    this.http.get<Array<FamiliaID>>(`${this.url_api}/familia?_page=1`).subscribe(datos =>
      {
        this.NowPage = this.NowPage + 1;
        this.cache_Familias.next(datos);
      }
    );
  }

  CallBack_More_Familias(){
    this.http.get<Array<FamiliaID>>(`${this.url_api}/familia?_page=${this.NowPage}`).pipe(delay(2500)).subscribe(datos =>
      {
        if(datos){
          this.NowPage = this.NowPage + 1;
          this.cache_Familias.next(this.cache_Familias.getValue().concat(datos)); //concat: combina listas iguales
        }
      }
    );
  }

  CallBack_One_Familia(id: number): Observable<FamiliaID | null> {
    return this.http.get<FamiliaID | null>(`${this.url_api}/familia/${id}`);
  }

  AddFamilia(Familia: Familia){
    return this.http.post(`${this.url_api}/familia`, Familia, httpOptions)
  }

  DeleteFamiliaId(id: number): Observable<any> {
    return this.http.delete(`${this.url_api}/familia/${id}`)
  }

  UpdateFamiliaId(id: number, payload: FamiliaOp): Observable<any>{
    return this.http.patch(`${this.url_api}/familia/${id}`, payload, httpOptions)
  }

}
