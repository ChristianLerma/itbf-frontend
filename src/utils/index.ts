// La función formatDateforHumans toma una cadena de fecha y la convierte en un formato legible para humanos, indicando cuánto tiempo ha pasado desde esa fecha hasta ahora.
// Utiliza la clase Date de JavaScript para calcular la diferencia entre la fecha actual y la fecha proporcionada, y devuelve una cadena que indica el tiempo transcurrido en segundos, minutos, horas, días, semanas o meses.
// La función es útil para mostrar fechas de manera más comprensible.
export function formatDateforHumans(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `hace ${seconds} segundos`;
    } else if (minutes < 60) {
        return `hace ${minutes} minutos`;
    } else if (hours < 24) {
        return `hace ${hours} horas`;
    } else if (days < 7) {
        return `hace ${days} días`;
    } else if (days < 30) {
        const weeks = Math.floor(days / 7);
        return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    } else {
        const months = Math.floor(days / 30);
        return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
}
