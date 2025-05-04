import { Link, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { getHabitacionesByHotelId } from '../services/HabitacionesService';
import { Habitacion } from '../types';
import HabitacionDetails from '../components/HabitacionDetails';

export async function loader({params} : LoaderFunctionArgs) {
    if (params.Id !== undefined) {
        const habitaciones = await getHabitacionesByHotelId(+params.Id)
        if (habitaciones === null || habitaciones === undefined || !habitaciones) {
            return redirect('/')
        }
        
        habitaciones.sort((a, b) => {
            const dateA = new Date(a.updated_at).getTime();
            const dateB = new Date(b.updated_at).getTime();
            return dateB - dateA;
        })

        return habitaciones;
    }
    
    return redirect('/')
}

export default function Habitaciones() {

    const habitaciones = useLoaderData() as Habitacion[];

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-yellow-500'>Habitaciones</h2>
                <Link 
                    to="/"
                    className='bg-gray-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-gray-400'
                >
                    Volver a Hoteles
                </Link>
            </div>

            <div className='flex justify-between items-center p-2'>
                <table className='w-full mt-10 table-auto shadow bg-white rounded-lg'>
                    <caption className='bg-yellow-600 text-white p-3 font-bold text-lg rounded-t-lg'>Habitaciones</caption>
                    <thead className='bg-slate-800 text-white'>
                        <tr>
                            <th className='p-2'>Habitación</th>
                            <th className='p-2'>Descripción</th>
                            <th className='p-2'>Acomodación</th>
                            <th className='p-2'>Tipo</th>
                            <th className='p-2'>Actuazalida</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones && habitaciones.map((habitacion) => (
                            <HabitacionDetails key={habitacion.id} habitacion={habitacion} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
