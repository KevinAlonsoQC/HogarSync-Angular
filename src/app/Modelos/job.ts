export interface Job {
    nombre_tarea: string;
    familia: number;
}
  
export interface JobID extends Job {
    id: number;
}
  
export interface JobOp extends Partial<Job> {}