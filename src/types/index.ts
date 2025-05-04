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

export type Hotel = InferOutput<typeof HotelSchema>;
//End HotelSchema

// Start HabitacionSchema
export const DrafHabitacionSchema = object({
    habitacion: string(),
    descripcion: string(),
    hotel_id: number(),
    hotel: string(),
    acomodacion_id: number(),
    acomodacion: string(),
    tipo_id: number(),
    tipo: string(),
    created_at: string(),
    updated_at: string(),
});

export const HabitacionSchema = object({
    id: number(),
    habitacion: string(),
    descripcion: string(),
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
