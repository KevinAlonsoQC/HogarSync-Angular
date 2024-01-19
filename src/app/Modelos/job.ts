import { FamiliaID } from "./familia";

export interface Job {
    nombre_tarea: string;
    familia: FamiliaID;
}
  
export interface JobID extends Job {
    id: number;
}
  
export interface JobOp extends Partial<Job> {}