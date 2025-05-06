import axios from "axios";
import { DrafHabitacionSchema, Habitacion, HabitacionesSchema, HabitacionSchema } from "../types";
import { safeParse } from "valibot";

// Este tipo define la estructura de los datos de una habitación
type HabitacionData = {
    [k: string]: FormDataEntryValue; // Se define como un objeto con claves de tipo string y valores de tipo FormDataEntryValue
};

// Este servicio se encarga de obtener las habitaciones desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función addHabitacion devuelve una promesa que se resuelve con los datos de la habitación
// La función addHabitacion recibe los datos de la habitación
export async function addHabitacion(data: HabitacionData) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(DrafHabitacionSchema, {
            hotel_id: +data.hotel_id,
            habitacion: data.habitacion,
            cantidad: +data.cantidad,
            descripcion: data.descripcion,
            acomodacion_id: +data.acomodacion_id,
            tipo_id: +data.tipo_id,
        });

        // Si los datos son válidos, se envían a la API para crear una nueva habitación
        // Si los datos no son válidos, se lanza un error
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/habitaciones`;
            const { data: response } = await axios.post(url, result.output, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response;
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error adding habitacion:', error);
    }
}

// Este servicio se encarga de obtener las habitaciones desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función getHabitacionById devuelve una promesa que se resuelve con los datos de la habitación
// La función getHabitacionById recibe el id de la habitación
export async function getHabitacionById(id: Habitacion['id']) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        const url = `${import.meta.env.VITE_API_URL}/habitaciones/${id}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(HabitacionSchema, data.data);

        // Si los datos son válidos, se devuelven
        // Si los datos no son válidos, se lanza un error
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing habitaciones data:', result);
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error fetching habitaciones:', error);
    }
}

// Este servicio se encarga de obtener las habitaciones desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función getHabitacionesByHotelId devuelve una promesa que se resuelve con los datos de las habitaciones 
// La función getHabitacionesByHotelId recibe el id del hotel
export async function getHabitacionesByHotelId(id: Habitacion['hotel_id']) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        const url = `${import.meta.env.VITE_API_URL}/habitaciones/hotel/${id}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(HabitacionesSchema, data.data);

        // Si los datos son válidos, se devuelven
        // Si los datos no son válidos, se lanza un error
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing habitaciones data:', result);
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error fetching habitaciones:', error);
    }
}

// Este servicio se encarga de obtener las habitaciones desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función updateHabitacion devuelve una promesa que se resuelve con los datos de la habitación
// La función updateHabitacion recibe el id de la habitación y los datos a actualizar
export async function updateHabitacion(id: Habitacion['id'], data: HabitacionData) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(DrafHabitacionSchema, {
            hotel_id: +data.hotel_id,
            habitacion: data.habitacion,
            cantidad: +data.cantidad,
            descripcion: data.descripcion,
            acomodacion_id: +data.acomodacion_id,
            tipo_id: +data.tipo_id,
        });

        // Si los datos son válidos, se envían a la API para actualizar la habitación
        // Si los datos no son válidos, se lanza un error
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/habitaciones/${id}/editar`;
            const { data: response } = await axios.put(url, result.output, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response;
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error updating habitacion:', error);
    }
}

// Este servicio se encarga de eliminar una habitación desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función deleteHabitacion devuelve una promesa que se resuelve con los datos de la habitación eliminada
// La función deleteHabitacion recibe el id de la habitación a eliminar
export async function deleteHabitacion(id: Habitacion['id']) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        const url = `${import.meta.env.VITE_API_URL}/habitaciones/${id}/eliminar`;
        const { data } = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        return data;
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error deleting habitaciones:', error);
    }
}