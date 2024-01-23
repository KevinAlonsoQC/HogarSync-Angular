export interface Usuario {
    nombre:string;
    apellido:string;
    correo:string;
    password:string;
    msj_activo:boolean;
    es_admin:boolean;
    familias: number[]; // Ajusta el tipo de 'familias' según tus necesidades

}
export interface UsuarioID extends Usuario{
    id: number;
}
  
export interface UsuarioOp extends Partial<Usuario>{}
  