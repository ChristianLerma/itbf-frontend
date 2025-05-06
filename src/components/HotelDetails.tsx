import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { Hotel } from "../types";
import { formatDateforHumans } from "../utils";
import { deleteHotel } from "../services/HotelesService";
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'

// Este componente se utiliza para mostrar los detalles de un hotel en una tabla
// Recibe un prop hotel que es un objeto de tipo Hotel
type HotelDetailsProps = {
    hotel: Hotel;
};

// Este componente se utiliza para manejar la acción de eliminar un hotel
// Recibe un prop params que es un objeto con un parámetro Id
// El parámetro Id se utiliza para obtener el hotel a eliminar
// Si el hotel no existe, se redirige a la página principal
// Si el hotel existe, se elimina y se redirige a la página principal
// Si no se proporciona un Id, se redirige a la página principal
export async function action({ params } : ActionFunctionArgs) {
    // Se obtiene el hotel a eliminar utilizando el Id proporcionado en los parámetros
    // Si el hotel no existe, se redirige a la página principal
    if (params.Id !== undefined) {
        // Se obtiene el hotel a eliminar utilizando el Id proporcionado en los parámetros
        await deleteHotel(+params.Id!);
        
        // Se muestra un mensaje de éxito utilizando la librería react-toastify
        toast.success('Hotel eliminado correctamente')
        
        // Si el hotel no existe, se redirige a la página principal
        return redirect('/');
    }

    // Si no se proporciona un Id, se redirige a la página principal
    return redirect('/');
}

// Este componente se utiliza para mostrar los detalles de un hotel en una tabla
// Recibe un prop hotel que es un objeto de tipo Hotel
export default function HotelDetails({hotel}: HotelDetailsProps) {

    // Se utiliza el hook useNavigate de react-router-dom para navegar a otras páginas
    const navigate = useNavigate();

    // Se utiliza el hook useState de react para manejar el estado del hotel
    // Se utiliza el hook useEffect de react para ejecutar una función cuando se monta el componente
    return (
        <tr key={hotel.id} className="border-b hover:bg-gray-50">
            <td className="p-2 text-sm text-gray-800">
                <a 
                    onClick={() => navigate(`/hoteles/${hotel.id}/editar`)}
                    className="text-green-700 hover:text-green-500 font-bold text-lg cursor-pointer"
                    data-tooltip-id={`tooltip-editar-hotel-${hotel.id}`} data-tooltip-content="Editar Hotel"
                >
                    {hotel.hotel} 
                </a>
                <Tooltip id={`tooltip-editar-hotel-${hotel.id}`} place="top" style={{ backgroundColor: "oklch(52.7% 0.154 150.069)", color: "#FFF"  }}/>
            </td>
            <td className="p-2 text-sm text-gray-800 hidden sm:table-cell">{hotel.direccion}</td>
            <td className="p-2 text-sm text-gray-800">{hotel.telefono}</td>
            <td className="p-2 text-xs text-gray-800 hidden sm:table-cell">
                <a href={`mailto:${hotel.email}`} className="text-blue-500 hover:text-blue-400 font-bold text-xs cursor-pointer">
                    {hotel.email.includes("@") ? hotel.email.split("@")[0] : hotel.email}
                </a>
            </td>
            <td className="p-2 text-xs text-gray-800 hidden md:table-cell">
                <a href={hotel.pagina_web} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 font-bold text-xs cursor-pointer">
                    {hotel.pagina_web.includes("http") ? hotel.pagina_web.split("/")[2] : hotel.pagina_web}
                </a>
            </td>
            <td className="p-2 text-sm text-gray-800 text-center">{hotel.numero_habitaciones}</td>
            <td className="p-2 text-sm text-center">
                <a
                    onClick={() => navigate(`/habitaciones/${hotel.id}`)}
                    className="font-bold text-yellow-500 hover:text-yellow-400 text-lg cursor-pointer"
                    data-tooltip-id={`tooltip-numero-habitaciones-${hotel.id}`} data-tooltip-html="Gestionar <br /> Habitaciones"
                >
                    {hotel.total_habitaciones}
                </a>
                <Tooltip id={`tooltip-numero-habitaciones-${hotel.id}`} place="top" style={{ backgroundColor: "rgb(234, 179, 8)", color: "#FFF"  }}/>
            </td>
            <td className="p-2 text-sm text-gray-800 text-nowrap hidden md:table-cell">{ formatDateforHumans(hotel.updated_at) }</td>
            <td className="p-2 text-sm text-gray-800 text-center">
                {hotel.total_habitaciones === 0 && (
                    <div className="flex justify-center items-center gap-2">
                        <Form
                            className="w-full items-center flex justify-center"
                            method="post"
                            action={`/hoteles/${hotel.id}/eliminar`}
                            onSubmit={(e) => {
                                if (!confirm('¿Estás seguro de que deseas eliminar este hotel?')) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button type="submit">
                                <svg type="submit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5 cursor-pointer text-red-800 hover:text-red-400" data-tooltip-id={`tooltip-eliminar-hotel-${hotel.id}`} data-tooltip-content="Eliminar Hotel">
                                    <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </Form>                    
                        <Tooltip id={`tooltip-eliminar-hotel-${hotel.id}`} place="top" style={{ backgroundColor: "oklch(44.4% 0.177 26.899)", color: "#FFF"  }}/>
                    </div>
                ) || (
                    <div className="flex justify-center items-center gap-2">
                        <div 
                            data-tooltip-id={`tooltip-eliminar-hotel-inactivo-${hotel.id}`} data-tooltip-html="Hotel con habitaciones, <br /> no se puede eliminar" 
                            className="cursor-not-allowed"
                        >
                            <svg type="submit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5 cursor-pointer text-gray-800 hover:cursor-no-drop" data-tooltip-id={`tooltip-eliminar-hotel-${hotel.id}`} data-tooltip-content="Eliminar Hotel">
                                <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <Tooltip id={`tooltip-eliminar-hotel-inactivo-${hotel.id}`} place="top" style={{ backgroundColor: "oklch(44.4% 0.177 26.899)", color: "#FFF"  }}/>
                        </div>
                    </div>
                )}
            </td>
        </tr>
        
    );
}
