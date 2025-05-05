import { safeParse } from "valibot";
import axios from "axios";
import { TiposSchema } from "../types";

export async function getTipos() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/tipos`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = safeParse(TiposSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing Tipos data:', result);
        }
    } catch (error) {
        console.error('Error fetching Tipos:', error);
    }
}
