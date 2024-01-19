import { FamiliaID } from "./familia";
import { UsuarioID } from "./usuario";
import { Job } from "./job";

export interface TareaRealizada {
    id: number;
    tarea: Job;
    nombre_familia: FamiliaID;
    responsable: UsuarioID;
    fecha_hora: Date;
    imagen: string | null;
}

export interface TareaRealizadaID extends TareaRealizada {
    id: number;
}
  
export interface TareaRealizadaOp extends Partial<TareaRealizada> {}