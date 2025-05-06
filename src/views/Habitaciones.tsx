import { Link, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { getHabitacionesByHotelId } from '../services/HabitacionesService';
import { Habitacion, Hotel } from '../types';
import HabitacionDetails from '../components/HabitacionDetails';
import { getHotelById } from '../services/HotelesService';

// La función loader se ejecuta antes de que se renderice el componente
// y se utiliza para cargar datos necesarios para el componente.
// En este caso, se utiliza para cargar las habitaciones de un hotel específico
// y redirigir si no se encuentra el hotel o las habitaciones.
export async function loader({params} : LoaderFunctionArgs) {
    // Se obtiene el ID del hotel de los parámetros de la URL
    // y se utiliza para obtener las habitaciones del hotel.
    if (params.Id !== undefined) {
        // Se obtienen las habitaciones del hotel utilizando el ID del hotel
        const habitaciones = await getHabitacionesByHotelId(+params.Id)
        if (habitaciones === null || habitaciones === undefined || !habitaciones) {
            return redirect('/')
        }
        
        // Se ordenan las habitaciones por fecha de actualización en orden descendente
        habitaciones.sort((a, b) => {
            const dateA = new Date(a.updated_at).getTime();
            const dateB = new Date(b.updated_at).getTime();
            return dateB - dateA;
        })

        // Se obtienen los detalles del hotel utilizando el ID del hotel
        const hotel = await getHotelById(+params.Id)
        if (hotel === null || hotel === undefined || !hotel) {
            return redirect('/')
        }

        // Se retorna un objeto que contiene las habitaciones y el hotel
        return {
            habitaciones, 
            hotel,
        }
    }
    
    // Si no se encuentra el ID del hotel, se redirige a la página principal
    return redirect('/')
}

// El componente Habitaciones se encarga de mostrar la lista de habitaciones
// de un hotel específico. Utiliza el hook useLoaderData para obtener los datos
// cargados en la función loader.
export default function Habitaciones() {

    // Se obtienen las habitaciones y el hotel utilizando el hook useLoaderData
    // que permite acceder a los datos cargados en la función loader.
    // Se utiliza un tipo de TypeScript para definir la estructura de los datos
    // que se espera recibir.
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
