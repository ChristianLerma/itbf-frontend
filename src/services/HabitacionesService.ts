import axios from "axios";
import { Habitacion, HabitacionesSchema } from "../types";
import { safeParse } from "valibot";

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