export interface Familia {
    nombre_familia: string;
    admin_familia: number;
    is_admin?: boolean; // Hacer la propiedad opcional
    token_link?: string;
    time_valid?: Date;
}

export interface FamiliaID extends Familia {
    id: number;
}

export interface FamiliaOp extends Partial<Familia> {}
