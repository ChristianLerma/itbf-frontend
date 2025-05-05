import { Link, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { getHabitacionesByHotelId } from '../services/HabitacionesService';
import { Habitacion, Hotel } from '../types';
import HabitacionDetails from '../components/HabitacionDetails';
import { getHotelById } from '../services/HotelesService';

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

        const hotel = await getHotelById(+params.Id)
        if (hotel === null || hotel === undefined || !hotel) {
            return redirect('/')
        }

        return {
            habitaciones, 
            hotel,
        }
    }
    
    return redirect('/')
}

export default function Habitaciones() {

    const { habitaciones, hotel } = useLoaderData() as { habitaciones: Habitacion[], hotel: Hotel };

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-yellow-500'>Hotel: {hotel.hotel} - <span className='text-3xl font-bold'>Gestión de las Habitaciones</span></h2>
                <Link 
                    to="/"
                    className='bg-indigo-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-indigo-800'
                >
                    Volver a Hoteles
                </Link>
            </div>

            <div className='flex justify-between items-center'>
                <table className='w-full mt-10 table-auto shadow bg-white rounded-lg'>
                    <caption className='bg-yellow-600 text-white p-3 font-bold text-lg rounded-t-lg'>
                        <div className='flex justify-between items-center'>
                            <span>
                                Lista de Habitaciones
                            </span>
                            <span className='text-white text-lg font-bold'>Capacidad: {hotel.numero_habitaciones} <span className='text-slate-900'>|</span> Habitaciones creadas: {hotel.total_habitaciones} <span className='text-slate-900'>|</span> Por crear: {hotel.numero_habitaciones - hotel.total_habitaciones}</span>
                            {hotel.numero_habitaciones - hotel.total_habitaciones > 0 && (
                                <Link 
                                    to={`/habitaciones/${hotel.id}/nueva`}
                                    className='bg-slate-800 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-slate-600'
                                >
                                    Crear Habitación
                                </Link>
                            )}

                        </div>
                    </caption>
                    <thead className='bg-slate-800 text-white'>
                        <tr>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Descripción</th>                            
                            <th className='p-2'>Cantidad</th>                            
                            <th className='p-2'>Tipo</th>
                            <th className='p-2'>Acomodación</th>
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
