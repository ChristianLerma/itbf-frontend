import { object, string, number, InferOutput, array } from "valibot";

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
    numero_habitaciones: number(),
    created_at: string(),
    updated_at: string(),
});

export const HotelesSchema = array(HotelSchema);

export type Hotel = InferOutput<typeof HotelSchema>;

