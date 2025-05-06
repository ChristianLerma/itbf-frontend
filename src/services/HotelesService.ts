import { safeParse } from "valibot";
import { DrafHotelSchema, HotelesSchema, Hotel, HotelSchema, HotelesExistenSchema } from "../types";
import axios from "axios";

// Este tipo define la estructura de los datos de un hotel
type HotelData = {
    [k: string]: FormDataEntryValue; // Se define como un objeto con claves de tipo string y valores de tipo FormDataEntryValue
};

// Este servicio se encarga de obtener los hoteles desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función addHotel devuelve una promesa que se resuelve con los datos del hotel
// La función addHotel recibe los datos del hotel
export async function addHotel(data: HotelData) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API        
        const result = safeParse(DrafHotelSchema, {
            hotel: data.hotel,
            descripcion: data.descripcion,
            direccion: data.direccion,
            telefono: data.telefono,
            email: data.email,
            pagina_web: data.pagina_web,
            numero_habitaciones: +data.numero_habitaciones,
        });        

        // Si los datos son válidos, se envían a la API para crear un nuevo hotel
        // Si los datos no son válidos, se lanza un error
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
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error adding hotel:', error);
    }
}

// Este servicio se encarga de obtener los hoteles desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función getHoteles devuelve una promesa que se resuelve con los datos de los hoteles
// La función getHoteles no recibe ningún parámetro
export async function getHoteles() {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        const url = `${import.meta.env.VITE_API_URL}/hoteles`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(HotelesSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing hoteles data:', result);
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error fetching hoteles:', error);
    }
}

// Este servicio se encarga de obtener los hoteles desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función getHotelById devuelve una promesa que se resuelve con los datos del hotel
// La función getHotelById recibe el id del hotel
export async function getHotelById(id: Hotel['id']) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        const url = `${import.meta.env.VITE_API_URL}/hoteles/${id}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(HotelSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing hoteles data:', result);
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error fetching hoteles:', error);
    }
}

// Este servicio se encarga de actualizar los hoteles desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función updateHotel devuelve una promesa que se resuelve con los datos del hotel
// La función updateHotel recibe el id del hotel y los datos a actualizar
export async function updateHotel(id: Hotel['id'], data: HotelData) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(DrafHotelSchema, {
            hotel: data.hotel,
            descripcion: data.descripcion,
            direccion: data.direccion,
            telefono: data.telefono,
            email: data.email,
            pagina_web: data.pagina_web,
            numero_habitaciones: +data.numero_habitaciones,
        });

        // Si los datos son válidos, se envían a la API para actualizar el hotel
        // Si los datos no son válidos, se lanza un error
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/hoteles/${id}/editar`;
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
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error updating hotel:', error);
    }
}

// Este servicio se encarga de eliminar los hoteles desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función deleteHotel devuelve una promesa que se resuelve con los datos del hotel
// La función deleteHotel recibe el id del hotel a eliminar
export async function deleteHotel(id: Hotel['id']) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        const url = `${import.meta.env.VITE_API_URL}/hoteles/${id}/eliminar`;
        const { data } = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return data;
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola        
        console.error('Error deleting hotel:', error);
    }
}

// Este servicio se encarga de obtener los hoteles desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función getHotelesByNombre devuelve una promesa que se resuelve con los datos del hotel
// La función getHotelesByNombre recibe el nombre del hotel
export async function getHotelesByNombre(hotel: Hotel['hotel']) {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        const url = `${import.meta.env.VITE_API_URL}/hoteles/nombre/${hotel}`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(HotelesExistenSchema, data.data);
        
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing hoteles data:', result);
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        console.error('Error fetching hoteles:', error);
    }
}
