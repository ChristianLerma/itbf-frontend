import { Link, useLoaderData } from 'react-router-dom';
import { getHoteles } from '../services/HotelesService';
import HotelDetails from '../components/HotelDetails';
import { Hotel } from '../types';

// La función loader se ejecuta antes de que se renderice el componente
// y se utiliza para cargar datos que se necesitan en el componente
// En este caso, se utiliza para cargar la lista de hoteles desde el servidor
// y pasarlos como props al componente
export async function loader() {
    // Se obtiene la lista de hoteles desde el servidor
    const hoteles = (await getHoteles()) ?? [];

    // Se ordenan los hoteles por fecha de actualización (updated_at) de forma descendente
    // para que los más recientes aparezcan primero
    hoteles.sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA;
    })  

    // Se devuelve la lista de hoteles para que se puedan utilizar en el componente
    return hoteles
}

// El componente Hoteles se encarga de mostrar la lista de hoteles
// y de renderizar la tabla con los datos de cada hotel
export default function Hoteles() {

    // Se obtienen los datos de la lista de hoteles desde el loader
    // y se asignan a la variable hoteles
    // Se utiliza el hook useLoaderData para obtener los datos cargados por el loader
    // y se especifica que el tipo de datos es un array de objetos Hotel
    const hoteles = useLoaderData() as Hotel[];

    return (
        <>
            <div className='flex justify-between items-center p-5'>
                <h2 className='text-4xl font-black text-slate-500'>Hoteles</h2>                
            </div>

            <div className="overflow-x-auto sm:overflow-hidden">
                <div className="inset-0 ">
                    <table className='min-w-full divide-y divide-slate-300 bg-white shadow rounded-xl pt-10 pb-5'>
                        <caption className='bg-indigo-600 text-white p-3 font-bold text-lg rounded-t-lg'>
                            <div className='flex justify-between items-center'>
                                <span className='text-lg font-bold pl-2'>
                                    Lista de Hoteles
                                </span>
                                <Link 
                                    to="/hoteles/nuevo"
                                    className='bg-slate-800 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-slate-600'
                                >
                                    Crear Hotel
                                </Link>
                            </div>
                        </caption>
                        <thead className='bg-slate-800 text-white text-sm'>
                            <tr className='text-white'>
                                <th className='pl-2 pr-2 py-4 font-bold'>Hotel</th>
                                <th className='pl-2 pr-2 py-4 font-bold hidden sm:table-cell'>Dirección</th>
                                <th className='pl-2 pr-2 py-4 font-bold'>Teléfono</th>
                                <th className='pl-2 pr-2 py-4 font-bold hidden sm:table-cell'>Email</th>
                                <th className='pl-2 pr-2 py-4 font-bold hidden md:table-cell'>Página Web</th>
                                <th className='pl-2 pr-2 py-4 font-bold'>Número de Habitaciones</th>
                                <th className='pl-2 pr-2 py-4 font-bold'>Habitaciones Creadas</th>
                                <th className='pl-2 pr-2 py-4 font-bold hidden md:table-cell'>Actualizado</th>
                                <th className='pl-2 pr-2 py-4 font-bold'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y bg-white text-gray-700 divide-slate-300 text-sm'>
                            {hoteles && hoteles.map((hotel) => (
                                <HotelDetails 
                                    key={hotel.id} 
                                    hotel={hotel} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
