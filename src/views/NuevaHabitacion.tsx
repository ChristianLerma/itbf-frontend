import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getHotelById } from '../services/HotelesService';
import { toast } from 'react-toastify';
import { Acomodacion, Hotel, Tipo } from '../types';
import { getAcomodaciones } from '../services/AcomodacionesService';
import { getTipos } from '../services/TiposService';
import { addHabitacion, getHabitacionesByHotelId } from '../services/HabitacionesService';
import { useEffect, useState } from 'react';

export async function action({ request } : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    
    if (error) {
        toast.error(error)
        
        return error;
    }

    const habitaciones = await getHabitacionesByHotelId(Number(data.hotel_id))
    const habitacionExistente = habitaciones?.find(habitacion => habitacion.acomodacion_id === Number(data.acomodacion_id) && habitacion.tipo_id === Number(data.tipo_id))
    if (habitacionExistente) {
        toast.error(habitacionExistente.habitacion + ' tiene el mismo tipo y acomodación (' + habitacionExistente.tipo + ' - ' + habitacionExistente.acomodacion + '). La actual ' + data.habitacion + ', no puede ser creada')
    
        const selectTipo = document.getElementById('tipo_id') as HTMLSelectElement | null;
        if (selectTipo) {
            selectTipo.value = '';
        }

        const selectAcomodaciones = document.getElementById('acomodacion_id') as HTMLSelectElement | null;
        if (selectAcomodaciones) {
            selectAcomodaciones.value = '';
        }

        return
    }

    const hotel = await getHotelById(Number(data.hotel_id))
    if (!hotel) {
        toast.error('El hotel no existe')
        
        return redirect('/');
    }
    
    if(hotel.numero_habitaciones < (hotel.total_habitaciones + Number(data.cantidad))) {
        toast.error('La cantidad supera la capacidad del hotel. Tiene '  + (hotel.numero_habitaciones - hotel.total_habitaciones) + ' disponibles para crear.')

        return
    }

    await addHabitacion(data);

    toast.success('Habitación creada correctamente')

    return redirect('/habitaciones/' + data.hotel_id);
}

export async function loader({params} : LoaderFunctionArgs) {
    if (params.Id !== undefined) {
        const hotel = await getHotelById(+params.Id)
        if (hotel === null || hotel === undefined || !hotel) {
            return redirect('/')
        }

        const acomodaciones = await getAcomodaciones()
        if (acomodaciones === null || acomodaciones === undefined || !acomodaciones) {
            return redirect('/')
        }

        const tipos = await getTipos()
        if (tipos === null || tipos === undefined || !tipos) {
            return redirect('/')
        }

        return {
            hotel,
            acomodaciones, 
            tipos,
        };
    }

    return redirect('/');
}

export default function NuevaHabitacion() {

    const error = useActionData() as string;

    const { hotel, tipos, acomodaciones } = useLoaderData() as { hotel: Hotel, tipos: Tipo[], acomodaciones: Acomodacion[] };

    const [acomodacionesFiltradas, setAcomodacionesFiltradas] = useState<Acomodacion[]>([]);
        useEffect(() => {
            setAcomodacionesFiltradas(acomodaciones.filter(acomodacion => {
                return acomodacion;
            }));
        }, [tipos]);

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-yellow-500'>Hotel: {hotel.hotel} - Crear Habitación</h2>
                <Link 
                    to={`/habitaciones/${hotel.id}`}
                    className='bg-yellow-500 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-yellow-800'
                >
                    Volver a Habitaciones
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form 
                className='bg-white shadow-md rounded-lg p-10'
                method='post'
            >
                <div className='mb-4'>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='mb-4 col-span-10'>
                            <input 
                                id="hotel_id" 
                                name='hotel_id'
                                type="hidden" 
                                value={hotel.id}
                            />
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="habitacion">
                                Nombre
                            </label>
                            <input
                                id="habitacion"
                                name='habitacion'
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Nombre de la Habitación'
                            />
                        </div>
                        <div className='mb-4 col-span-2'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="cantidad">
                                Cantidad
                            </label>
                            <input
                                id="cantidad"
                                name='cantidad'
                                type="number" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Cantidad de habitaciones'
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='mb-4 col-span-5'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea 
                            name="descripcion" 
                            id="descripcion" 
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50'                            
                            placeholder='Descripción de la habitación'
                        ></textarea>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='mb-4 col-span-1'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="tipo_id">
                                Tipo de Habitación
                            </label>
                            <select 
                                id="tipo_id" 
                                name='tipo_id'
                                className='shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-50'
                                onChange={(e) => {
                                    const selectedTipoId = Number(e.target.value);
                                    setAcomodacionesFiltradas(acomodaciones.filter(acomodacion => {
                                        if (selectedTipoId === 1) {
                                            return acomodacion.id === 1 || acomodacion.id === 2;
                                        } else if (selectedTipoId === 2) {
                                            return acomodacion.id === 3 || acomodacion.id === 4;
                                        } else if (selectedTipoId === 3) {
                                            return acomodacion.id === 1 || acomodacion.id === 2 || acomodacion.id === 3;
                                        } else {
                                            return true;
                                        }
                                    }));
                                }}
                            >
                                <option value="">Seleccione el tipo de habitación...</option>
                                {tipos.map(tipo => (
                                    <option 
                                        key={tipo.id} 
                                        value={tipo.id}
                                    >
                                        {tipo.tipo}
                                    </option>
                                ))}                                
                            </select>
                        </div>
                        <div className='mb-4 col-span-1'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="acomodacion_id">
                                Acomodacion
                            </label>
                            <select 
                                id="acomodacion_id" 
                                name='acomodacion_id'
                                className='shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-50'
                            >
                                <option value="">Seleccione la acomodación...</option>
                                {acomodacionesFiltradas.map(acomodacion => (
                                    <option 
                                        key={acomodacion.id} 
                                        value={acomodacion.id}
                                    >
                                        {acomodacion.acomodacion}
                                    </option>
                                ))}
                            </select>
                        </div>                        
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-2 gap-4'>
                        <button 
                            type='submit'
                            className='w-full bg-yellow-500 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-yellow-800 hover:cursor-pointer'
                        >
                            Crear Habitación
                        </button>
                        <Link 
                            to={`/habitaciones/${hotel.id}`}
                            className='grid-span-1 w-full bg-gray-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-gray-500 hover:cursor-pointer text-center'
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </Form>
        </>
    );
}
