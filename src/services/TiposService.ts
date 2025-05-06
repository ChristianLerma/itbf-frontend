import { safeParse } from "valibot";
import axios from "axios";
import { TiposSchema } from "../types";

// La función getTipos se encarga de obtener los tipos de datos desde la API y devolverlos en un formato seguro.
// Utiliza la librería axios para realizar la solicitud HTTP y valibot para validar la respuesta.
// Si la respuesta no es válida, se registra un error en la consola. En caso de error en la solicitud, también se registra un error.
// La función devuelve un array de tipos de datos si la respuesta es válida, o undefined si no lo es.
export async function getTipos() {
    try {
        // Se construye la URL de la API utilizando la variable de entorno VITE_API_URL
        // y se realiza una solicitud GET a la ruta /tipos.
        const url = `${import.meta.env.VITE_API_URL}/tipos`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Se utiliza la función safeParse de valibot para validar la respuesta de la API
        const result = safeParse(TiposSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing Tipos data:', result);
        }
    } catch (error) {
        // En caso de error en la solicitud, se registra el error en la consola
        console.error('Error fetching Tipos:', error);
    }
}
