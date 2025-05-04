import { safeParse } from "valibot";
import { DrafHotelSchema, HotelesSchema, Hotel, HotelSchema } from "../types";
import axios from "axios";

type HotelData = {
    [k: string]: FormDataEntryValue;
};

export async function addHotel(data: HotelData) {
    try {
        const result = safeParse(DrafHotelSchema, {
            hotel: data.hotel,
            descripcion: data.descripcion,
            direccion: data.direccion,
            telefono: data.telefono,
            email: data.email,
            pagina_web: data.pagina_web,
            numero_habitaciones: +data.numero_habitaciones,
        });        

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/hoteles`;
            const { data: response } = await axios.post(url, { 
                hotel: result.output.hotel,
                descripcion: result.output.descripcion,
                direccion: result.output.direccion,
                telefono: result.output.telefono,
                email: result.output.email,
                pagina_web: result.output.pagina_web,
                numero_habitaciones: result.output.numero_habitaciones,
             }, { 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response;
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.error('Error adding hotel:', error);
    }
}

export async function getHotels() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/hoteles`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = safeParse(HotelesSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing hotels data:', result);
        }
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

export async function getHotelsById(id: Hotel['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/hoteles/${id}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = safeParse(HotelSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing hotels data:', result);
        }
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

export async function updateHotel(id: Hotel['id'], data: HotelData) {
    try {
        const result = safeParse(DrafHotelSchema, {
            hotel: data.hotel,
            descripcion: data.descripcion,
            direccion: data.direccion,
            telefono: data.telefono,
            email: data.email,
            pagina_web: data.pagina_web,
            numero_habitaciones: +data.numero_habitaciones,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/hoteles/${id}`;
            const { data: response } = await axios.put(url, { 
                hotel: result.output.hotel,
                descripcion: result.output.descripcion,
                direccion: result.output.direccion,
                telefono: result.output.telefono,
                email: result.output.email,
                pagina_web: result.output.pagina_web,
                numero_habitaciones: result.output.numero_habitaciones,
             }, { 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response;
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.error('Error updating hotel:', error);
    }
}

export async function deleteHotel(id: Hotel['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/hoteles/${id}/eliminar`;
        const { data } = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return data;
    } catch (error) {
        console.error('Error deleting hotel:', error);
    }
}
