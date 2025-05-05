import axios from "axios";
import { DrafHabitacionSchema, Habitacion, HabitacionesSchema, HabitacionSchema } from "../types";
import { safeParse } from "valibot";

type HabitacionData = {
    [k: string]: FormDataEntryValue;
};

export async function addHabitacion(data: HabitacionData) {
    try {
        const result = safeParse(DrafHabitacionSchema, {
            hotel_id: +data.hotel_id,
            habitacion: data.habitacion,
            cantidad: +data.cantidad,
            descripcion: data.descripcion,
            acomodacion_id: +data.acomodacion_id,
            tipo_id: +data.tipo_id,
        });
            
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
        console.error('Error adding habitacion:', error);
    }
}

export async function getHabitacionById(id: Habitacion['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/habitaciones/${id}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = safeParse(HabitacionSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing habitaciones data:', result);
        }
    } catch (error) {
        console.error('Error fetching habitaciones:', error);
    }
}

export async function getHabitacionesByHotelId(id: Habitacion['hotel_id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/habitaciones/hotel/${id}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = safeParse(HabitacionesSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing habitaciones data:', result);
        }
    } catch (error) {
        console.error('Error fetching habitaciones:', error);
    }
}

export async function updateHabitacion(id: Habitacion['id'], data: HabitacionData) {
    try {
        const result = safeParse(DrafHabitacionSchema, {
            hotel_id: +data.hotel_id,
            habitacion: data.habitacion,
            cantidad: +data.cantidad,
            descripcion: data.descripcion,
            acomodacion_id: +data.acomodacion_id,
            tipo_id: +data.tipo_id,
        });
            
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
        console.error('Error updating habitacion:', error);
    }
}

export async function deleteHabitacion(id: Habitacion['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/habitaciones/${id}/eliminar`;
        const { data } = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return data;
    } catch (error) {
        console.error('Error deleting habitaciones:', error);
    }
}