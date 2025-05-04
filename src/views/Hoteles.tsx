import { Link, useLoaderData } from 'react-router-dom';
import { getHotels } from '../services/HotelesService';
import HotelDetails from '../components/HotelDetails';
import { Hotel } from '../types';

export async function loader() {
    const hoteles = (await getHotels()) ?? [];

    hoteles.sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA;
    })  

    return hoteles
}

export default function Hoteles() {

    const hoteles = useLoaderData() as Hotel[];

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-slate-500'>Hoteles</h2>
                <Link 
                    to="/hoteles/nuevo"
                    className='bg-indigo-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-indigo-500'
                >
                    Crear Hotel
                </Link>
            </div>

            <div className='flex justify-between items-center'>
                <table className='w-full mt-10 table-auto shadow bg-white rounded-lg'>
                    <caption className='bg-indigo-600 text-white p-3 font-bold text-lg rounded-t-lg'>Lista de Hoteles</caption>
                    <thead className='bg-slate-800 text-white'>
                        <tr>
                            <th className='p-2'>Hotel</th>
                            <th className='p-2'>Dirección</th>
                            <th className='p-2'>Teléfono</th>
                            <th className='p-2'>Email</th>
                            <th className='p-2'>Página Web</th>
                            <th className='p-2'>Número de Habitaciones</th>
                            <th className='p-2'>Habitaciones Creadas</th>
                            <th className='p-2'>Actualizado</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hoteles && hoteles.map((hotel) => (
                            <HotelDetails 
                                key={hotel.id} 
                                hotel={hotel} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
