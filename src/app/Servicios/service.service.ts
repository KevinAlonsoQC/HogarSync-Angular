import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http:HttpClient) { }

  //Usuarios
  CallBack_Usuarios(): Observable<any>{
    return this.http.get<Array<UsuarioID>>(`${this.url_api}/usuario`);
  }

  //Usuarios
  Callback_All_Usuarios(){
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
    return this.http.get<Array<FamiliaID>>(`${this.url_api}/familia`);
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

  UpdateFamiliaInvite(id: number, payload: FamiliaOp): Observable<any>{
    return this.http.put(`${this.url_api}/familia/${id}`, payload, httpOptions)
  }


  //Tareas
  CallBack_All_Tareas(){
    return this.http.get<Array<JobID>>(`${this.url_api}/job`);
  }

  CallBack_One_Tarea(id: number): Observable<JobID | null> {
    return this.http.get<JobID | null>(`${this.url_api}/job/${id}`);
  }

  AddTarea(Job: Job){
    return this.http.post(`${this.url_api}/job`, Job, httpOptions)
  }

  DeleteTareasId(id: number): Observable<any> {
    return this.http.delete(`${this.url_api}/job/${id}`)
  }

  UpdateTareasId(id: number, payload: JobOp): Observable<any>{
    return this.http.patch(`${this.url_api}/job/${id}`, payload, httpOptions)
  }

  //Historial y Mensajes
  CallBack_All_Tareas_Realizadas(){
    return this.http.get<Array<TareaRealizadaID>>(`${this.url_api}/tarea_realizada`);
  }

  CallBack_One_Tareas_Realizadas(id: number): Observable<TareaRealizadaID | null> {
    return this.http.get<TareaRealizadaID | null>(`${this.url_api}/tarea_realizada/${id}`);
  }

  AddTareas_Realizadas(TareaRealizada: TareaRealizada){
    return this.http.post(`${this.url_api}/tarea_realizada`, TareaRealizada, httpOptions)
  }

  DeleteTareas_RealizadasId(id: number): Observable<any> {
    return this.http.delete(`${this.url_api}/tarea_realizada/${id}`)
  }

  UpdateTareas_RealizadasId(id: number, payload: TareaRealizadaOp): Observable<any>{
    return this.http.patch(`${this.url_api}/tarea_realizada/${id}`, payload, httpOptions)
  }

}
