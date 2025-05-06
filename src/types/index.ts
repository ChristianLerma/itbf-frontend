import { object, string, number, InferOutput, array } from "valibot";

//Start HotelSchema
// El esquema DrafHotelSchema define la estructura de un objeto hotel, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen hotel, descripcion, direccion, telefono, email, pagina_web y numero_habitaciones.
export const DrafHotelSchema = object({
    hotel: string(),
    descripcion: string(),
    direccion: string(),
    telefono: string(),
    email: string(),
    pagina_web: string(),
    numero_habitaciones: number(),
});

// El esquema HotelSchema define la estructura de un objeto hotel, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen id, hotel, descripcion, direccion, telefono, email, pagina_web, calificacion, numero_habitaciones, created_at y updated_at.
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

// El esquema HotelesSchema es un array que contiene múltiples objetos hotel, cada uno validado por el HotelSchema.
export const HotelesSchema = array(HotelSchema);

// El esquema HotelExisteSchema define la estructura de un objeto hotel existente, incluyendo sus propiedades y tipos de datos esperados.
export const HotelExisteSchema = object({
    id: number(),
    hotel: string()
});

// El esquema HotelesExistenSchema es un array que contiene múltiples objetos hotel existente, cada uno validado por el HotelExisteSchema.
export const HotelesExistenSchema = array(HotelExisteSchema);

// El esquema HotelSchema se utiliza para validar la estructura de los datos de un hotel, asegurando que cumplen con los tipos y formatos esperados.
// Se utiliza la función InferOutput de valibot para inferir el tipo de salida del esquema HotelSchema.
export type Hotel = InferOutput<typeof HotelSchema>;
//End HotelSchema

// Start HabitacionSchema
// El esquema DrafHabitacionSchema define la estructura de un objeto habitacion, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen habitacion, descripcion, cantidad, hotel_id, acomodacion_id y tipo_id.
export const DrafHabitacionSchema = object({
    habitacion: string(),
    descripcion: string() || null,
    cantidad: number(),
    hotel_id: number(),
    acomodacion_id: number(),
    tipo_id: number(),
});

// El esquema HabitacionSchema define la estructura de un objeto habitacion, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen id, habitacion, descripcion, cantidad, hotel_id, hotel, acomodacion_id, acomodacion,
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
    
// El esquema HabitacionesSchema es un array que contiene múltiples objetos habitacion, cada uno validado por el HabitacionSchema.
export const HabitacionesSchema = array(HabitacionSchema);

// El esquema HabitacionSchema se utiliza para validar la estructura de los datos de una habitacion, asegurando que cumplen con los tipos y formatos esperados.
// Se utiliza la función InferOutput de valibot para inferir el tipo de salida del esquema HabitacionSchema.
export type Habitacion = InferOutput<typeof HabitacionSchema>;
// End HabitacionSchema

// Start AcomodacionSchema
// El esquema DrafAcomodacionSchema define la estructura de un objeto acomodacion, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen acomodacion, descripcion, created_at y updated_at.
export const DrafAcomodacionSchema = object({
    acomodacion: string(),
    descripcion: string() || null,
    created_at: string(),
    updated_at: string(),
});

// El esquema AcomodacionSchema define la estructura de un objeto acomodacion, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen id, acomodacion, descripcion, created_at y updated_at.
export const AcomodacionSchema = object({
    id: number(),
    acomodacion: string(),
    descripcion: string(),
    created_at: string(),
    updated_at: string(),
});

// El esquema AcomodacionesSchema es un array que contiene múltiples objetos acomodacion, cada uno validado por el AcomodacionSchema.
export const AcomodacionesSchema = array(AcomodacionSchema);

// El esquema AcomodacionSchema se utiliza para validar la estructura de los datos de una acomodacion, asegurando que cumplen con los tipos y formatos esperados.
// Se utiliza la función InferOutput de valibot para inferir el tipo de salida del esquema AcomodacionSchema.
export type Acomodacion = InferOutput<typeof AcomodacionSchema>;
// End AcomodacionSchema

// Start TipoSchema
// El esquema DrafTipoSchema define la estructura de un objeto tipo, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen tipo, descripcion, created_at y updated_at.
export const DrafTipoSchema = object({
    tipo: string(),
    descripcion: string(),
    created_at: string(),
    updated_at: string(),
});

// El esquema TipoSchema define la estructura de un objeto tipo, incluyendo sus propiedades y tipos de datos esperados.
// Se utiliza la función object de valibot para crear un esquema de validación que asegura que los datos cumplen con la estructura definida.
// Las propiedades incluyen id, tipo, descripcion, created_at y updated_at.
export const TipoSchema = object({
    id: number(),
    tipo: string(),
    descripcion: string(),
    created_at: string(),
    updated_at: string(),
});

// El esquema TiposSchema es un array que contiene múltiples objetos tipo, cada uno validado por el TipoSchema.
export const TiposSchema = array(TipoSchema);

// El esquema TipoSchema se utiliza para validar la estructura de los datos de un tipo, asegurando que cumplen con los tipos y formatos esperados.
// Se utiliza la función InferOutput de valibot para inferir el tipo de salida del esquema TipoSchema.
export type Tipo = InferOutput<typeof TipoSchema>;
// End TipoSchema
