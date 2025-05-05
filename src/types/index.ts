import { object, string, number, InferOutput, array } from "valibot";

//Start HotelSchema
export const DrafHotelSchema = object({
    hotel: string(),
    descripcion: string(),
    direccion: string(),
    telefono: string(),
    email: string(),
    pagina_web: string(),
    numero_habitaciones: number(),
});

export const HotelSchema = object({
    id: number(),
    hotel: string(),
    descripcion: string(),
    direccion: string(),
    telefono: string(),
    email: string(),
    pagina_web: string(),
    calificacion: number(),
    numero_habitaciones: number(),
    created_at: string(),
    updated_at: string(),
    total_habitaciones: number(),
});

export const HotelesSchema = array(HotelSchema);

export const HotelExisteSchema = object({
    id: number(),
    hotel: string()
});

export const HotelesExistenSchema = array(HotelExisteSchema);

export type Hotel = InferOutput<typeof HotelSchema>;
//End HotelSchema

// Start HabitacionSchema
export const DrafHabitacionSchema = object({
    habitacion: string(),
    descripcion: string() || null,
    cantidad: number(),
    hotel_id: number(),
    acomodacion_id: number(),
    tipo_id: number(),
});

export const HabitacionSchema = object({
    id: number(),
    habitacion: string(),
    descripcion: string() || null,
    cantidad: number(),
    hotel_id: number(),
    hotel: string(),
    acomodacion_id: number(),
    acomodacion: string(),
    tipo_id: number(),
    tipo: string(),
    created_at: string(),
    updated_at: string(),
});
    
export const HabitacionesSchema = array(HabitacionSchema);

export type Habitacion = InferOutput<typeof HabitacionSchema>;
// End HabitacionSchema

// Start AcomodacionSchema
export const DrafAcomodacionSchema = object({
    acomodacion: string(),
    descripcion: string() || null,
    created_at: string(),
    updated_at: string(),
});

export const AcomodacionSchema = object({
    id: number(),
    acomodacion: string(),
    descripcion: string(),
    created_at: string(),
    updated_at: string(),
});

export const AcomodacionesSchema = array(AcomodacionSchema);

export type Acomodacion = InferOutput<typeof AcomodacionSchema>;
// End AcomodacionSchema

// Start TipoSchema
export const DrafTipoSchema = object({
    tipo: string(),
    descripcion: string(),
    created_at: string(),
    updated_at: string(),
});

export const TipoSchema = object({
    id: number(),
    tipo: string(),
    descripcion: string(),
    created_at: string(),
    updated_at: string(),
});

export const TiposSchema = array(TipoSchema);

export type Tipo = InferOutput<typeof TipoSchema>;
// End TipoSchema
