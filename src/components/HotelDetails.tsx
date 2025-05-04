import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { Hotel } from "../types";
import { formatDateforHumans } from "../utils";
import { deleteHotel } from "../services/HotelesService";
import { toast } from 'react-toastify';

type HotelDetailsProps = {
    hotel: Hotel;
};

export async function action({ params } : ActionFunctionArgs) {
    if (params.Id !== undefined) {
        await deleteHotel(+params.Id!);

        toast.success('Hotel eliminado correctamente')

        return redirect('/');
    }

    return redirect('/');
}

export default function HotelDetails({hotel}: HotelDetailsProps) {

    const navigate = useNavigate();

    return (
        <tr key={hotel.id} className="border-b hover:bg-gray-50">
            <td className="p-2 text-sm text-gray-800">{hotel.hotel}</td>
            <td className="p-2 text-sm text-gray-800">{hotel.direccion}</td>
            <td className="p-2 text-sm text-gray-800">{hotel.telefono}</td>
            <td className="p-2 text-sm text-gray-800">{hotel.email}</td>
            <td className="p-2 text-sm text-gray-800">{hotel.pagina_web}</td>
            <td className="p-2 text-sm text-gray-800 text-center">{hotel.numero_habitaciones}</td>
            <td className="p-2 text-sm text-gray-800 text-nowrap">{ formatDateforHumans(hotel.updated_at) }</td>
            <td className="p-2 text-sm text-gray-800 text-center">
                <div className="flex justify-center items-center gap-2">
                    <button 
                        type="button"
                        onClick={() => navigate(`/hoteles/${hotel.id}/editar`)}
                        className="bg-green-700 text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-green-500 hover:cursor-pointer"
                    >
                        Editar
                    </button>
                    <Form
                        className="w-full"
                        method="post"
                        action={`/hoteles/${hotel.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Estás seguro de que deseas eliminar este hotel?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input type="submit" value="Eliminar" 
                            className="bg-red-500 text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-red-400 hover:cursor-pointer"
                        />
                    </Form>
                    <button 
                        type="button" 
                        onClick={() => navigate(`/habitaciones/${hotel.id}`)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-yellow-400 hover:cursor-pointer"
                    >
                        Habitaciones
                    </button>
                </div>
            </td>
        </tr>   
    );
}
