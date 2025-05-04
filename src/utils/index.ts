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

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDateTimeFull(dateString: string) {    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

export function formatDateTimeFullWithSeconds(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}