import { PropsWithChildren } from "react";

// Este componente se utiliza para mostrar mensajes de error en la aplicación   
// Recibe un prop children que es el mensaje de error a mostrar
// El mensaje de error se muestra en un div con clases de Tailwind CSS para darle estilo
export default function ErrorMessage( {children} : PropsWithChildren ) {
    return (
        <div className="mt-10">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {children}
            </div>
        </div>
    );
}
