import { useNavigate, Form, ActionFunctionArgs, redirect } from "react-router-dom";
import { Habitacion } from "../types";
import { formatDateforHumans } from "../utils";
import { deleteHabitacion } from "../services/HabitacionesService";
import { toast } from 'react-toastify';

type HabitacionDetailsProps = {
    habitacion: Habitacion;
};

export async function action({ params } : ActionFunctionArgs) {
    if (params.Id !== undefined) {
        await deleteHabitacion(+params.Id!);

        toast.success('Habitación eliminada correctamente')

        return redirect('/habitaciones/' + params.Id);
    }

    return redirect('/');
}

export default function HabitacionDetails({habitacion}: HabitacionDetailsProps) {

    const navigate = useNavigate();

    return (
        <tr key={habitacion.id} className="border-b hover:bg-gray-50">
            <td className="p-2 text-sm text-gray-800">{habitacion.habitacion}</td>
            <td className="p-2 text-sm text-gray-800">{habitacion.descripcion}</td>
            <td className="p-2 text-sm text-gray-800">{habitacion.acomodacion}</td>
            <td className="p-2 text-sm text-gray-800">{habitacion.tipo}</td>
            <td className="p-2 text-sm text-gray-800 text-nowrap">{ formatDateforHumans(habitacion.updated_at) }</td>
            <td className="p-2 text-sm text-gray-800 text-center">
                <div className="flex justify-center items-center gap-2">
                    <button 
                        type="button"
                        onClick={() => navigate(`/hoteles/${habitacion.id}/editar`)}
                        className="bg-green-700 text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-green-500 hover:cursor-pointer"
                    >
                        Editar
                    </button>
                    <Form
                        className="w-full"
                        method="post"
                        action={`/habitaciones/${habitacion.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Estás seguro de que deseas eliminar la habitación?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input type="submit" value="Eliminar" 
                            className="bg-red-500 text-white px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-red-400 hover:cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
