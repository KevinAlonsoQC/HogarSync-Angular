export interface TareaRealizada {
    tarea: string;
    familia: number; //id de la familia en la cual se realizó
    usuario: string; //nombre y apellido del usuario que la realizó
    fecha_hora: string;
}

export interface TareaRealizadaID extends TareaRealizada {
    id: number;
}
  
export interface TareaRealizadaOp extends Partial<TareaRealizada> {}