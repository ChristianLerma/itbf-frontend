import { safeParse } from "valibot";
import axios from "axios";
import { AcomodacionesSchema } from "../types";

export async function getAcomodaciones() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/acomodaciones`;
        const { data } = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = safeParse(AcomodacionesSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Error parsing Acomodaciones data:', result);
        }
    } catch (error) {
        console.error('Error fetching Acomodaciones:', error);
    }
}
