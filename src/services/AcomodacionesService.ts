import { safeParse } from "valibot";
import axios from "axios";
import { AcomodacionesSchema } from "../types";

// Este servicio se encarga de obtener las acomodaciones desde la API
// Utiliza la librería axios para realizar la petición HTTP
// La función getAcomodaciones devuelve una promesa que se resuelve con los datos de las acomodaciones
// Si ocurre un error, se captura y se muestra en la consola
export async function getAcomodaciones() {
    try {
        // Se obtiene la URL de la API desde las variables de entorno
        // Se utiliza la librería axios para realizar la petición HTTP
        const url = `${import.meta.env.VITE_API_URL}/acomodaciones`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la librería valibot para validar los datos obtenidos de la API
        // Se utiliza la función safeParse para validar los datos obtenidos de la API
        const result = safeParse(AcomodacionesSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing Acomodaciones data:', result);
        }
    } catch (error) {
        // Si ocurre un error, se captura y se muestra en la consola
        // Se utiliza la función console.error para mostrar el error en la consola
        console.error('Error fetching Acomodaciones:', error);
    }
}
