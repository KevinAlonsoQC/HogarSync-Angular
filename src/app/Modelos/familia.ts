import { UsuarioID } from "./usuario";

export interface Familia {
    nombre_familia: string;
    admin_familia: number;
    is_admin: boolean;

}


export interface FamiliaID extends Familia {
    id: number;
}
  
export interface FamiliaOp extends Partial<Familia> {}