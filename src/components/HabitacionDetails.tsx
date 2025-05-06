import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { Habitacion } from "../types";
import { formatDateforHumans } from "../utils";
import { deleteHabitacion, getHabitacionById } from "../services/HabitacionesService";
import { toast } from 'react-toastify';
import { Tooltip } from "react-tooltip";

// Este componente se utiliza para mostrar los detalles de una habitación en una tabla
// Recibe un prop habitacion que es un objeto de tipo Habitacion
type HabitacionDetailsProps = {
    habitacion: Habitacion;
};

// Este componente se utiliza para manejar la acción de eliminar una habitación
// Recibe un prop params que es un objeto con un parámetro Id
// El parámetro Id se utiliza para obtener la habitación a eliminar
// Si la habitación no existe, se redirige a la página principal
// Si la habitación existe, se elimina y se redirige a la página de habitaciones del hotel correspondiente
// Si no se proporciona un Id, se redirige a la página principal
export async function action({ params } : ActionFunctionArgs) {
    if (params.Id !== undefined) {

        // Se obtiene la habitación a eliminar utilizando el Id proporcionado en los parámetros
        // Si la habitación no existe, se redirige a la página principal
        const habitacion = await getHabitacionById(+params.Id!);
        if (habitacion === null || habitacion === undefined || !habitacion) {
            return redirect('/')
        }

        // Se elimina la habitación utilizando el Id proporcionado en los parámetros
        await deleteHabitacion(+params.Id!);

        // Se muestra un mensaje de éxito utilizando la librería react-toastify
        toast.success('Habitación eliminada correctamente')

        // Se redirige a la página de habitaciones del hotel correspondiente utilizando el Id del hotel de la habitación eliminada
        // Se utiliza el Id del hotel de la habitación eliminada para redirigir a la página de habitaciones del hotel correspondiente
        return redirect('/habitaciones/' + habitacion.hotel_id);
    }

    // Si no se proporciona un Id, se redirige a la página principal
    // Se redirige a la página principal utilizando la función redirect de react-router-dom
    return redirect('/');
}

// Este componente se utiliza para mostrar los detalles de una habitación en una tabla
// Recibe un prop habitacion que es un objeto de tipo Habitacion
export default function HabitacionDetails({habitacion}: HabitacionDetailsProps) {

    // Se utiliza el hook useNavigate de react-router-dom para navegar a otras páginas
    const navigate = useNavigate();

    // Se utiliza el hook useState de react para manejar el estado de la habitación
    // Se utiliza el hook useEffect de react para ejecutar una función cuando se monta el componente
    return (
        <tr key={habitacion.id} className="border-b hover:bg-gray-50">
            <td className="p-2 text-sm text-gray-800">
                <a
                    onClick={() => navigate(`/habitaciones/${habitacion.id}/editar`)}
                    className="text-yellow-700 hover:text-yellow-500 font-bold text-lg cursor-pointer"
                    data-tooltip-id={`tooltip-editar-habitacion-${habitacion.id}`} data-tooltip-content="Editar Habitación"
                >
                    {habitacion.habitacion}
                </a>
                <Tooltip id={`tooltip-editar-habitacion-${habitacion.id}`} place="top" style={{ backgroundColor: "rgb(234, 179, 8)", color: "#FFF"  }}/>
            </td>
            <td className="p-2 text-sm text-gray-800 hidden sm:table-cell">{habitacion.descripcion}</td>
            <td className="p-2 text-sm text-gray-800">{habitacion.cantidad}</td>
            <td className="p-2 text-sm text-gray-800">{habitacion.tipo}</td>
            <td className="p-2 text-sm text-gray-800">{habitacion.acomodacion}</td>
            <td className="p-2 text-sm text-gray-800 text-nowrap hidden sm:table-cell">{ formatDateforHumans(habitacion.updated_at) }</td>
            <td className="p-2 text-sm text-gray-800 text-center">
                <div className="flex justify-center items-center gap-2">
                    <Form
                        className="w-full items-center flex justify-center"
                        method="post"
                        action={`/habitaciones/${habitacion.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">
                            <svg type="submit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5 cursor-pointer text-red-800 hover:text-red-400" data-tooltip-id={`tooltip-eliminar-hotel-${habitacion.id}`} data-tooltip-html="Eliminar <br /> Habitación">
                                <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </Form>                    
                    <Tooltip id={`tooltip-eliminar-hotel-${habitacion.id}`} place="top" style={{ backgroundColor: "oklch(44.4% 0.177 26.899)", color: "#FFF"  }}/>
                </div>
            </td>
        </tr>
    );
}
