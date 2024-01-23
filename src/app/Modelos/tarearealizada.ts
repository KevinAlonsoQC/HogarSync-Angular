export interface TareaRealizada {
    id: number;
    tarea: number; //ID de la tarea realizada
    familia: number; //id de la familia en la cual se realizó
    usuario: number; //id del usuario que la realizó
    fecha_hora: Date;
    imagen: string | null;
}

export interface TareaRealizadaID extends TareaRealizada {
    id: number;
}
  
export interface TareaRealizadaOp extends Partial<TareaRealizada> {}