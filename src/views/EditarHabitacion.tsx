import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'react-toastify';
import { Acomodacion, Habitacion, Tipo } from '../types';
import { getAcomodaciones } from '../services/AcomodacionesService';
import { getTipos } from '../services/TiposService';
import { getHabitacionById, getHabitacionesByHotelId, updateHabitacion } from '../services/HabitacionesService';
import { useEffect, useState } from 'react';

export async function loader({params} : LoaderFunctionArgs) {
    if (params.Id !== undefined) {
        const habitacion = await getHabitacionById(+params.Id)
        if (habitacion === null || habitacion === undefined || !habitacion) {
            return redirect('/')
        }

        const tipos = await getTipos()
        if (tipos === null || tipos === undefined || !tipos) {
            return redirect('/')
        }
        
        const acomodaciones = await getAcomodaciones()
        if (acomodaciones === null || acomodaciones === undefined || !acomodaciones) {
            return redirect('/')
        }

        return {
            habitacion,
            tipos,
            acomodaciones, 
        };
    }

    return redirect('/');
}

export async function action({ request, params } : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    
    if (error) {
        toast.error(error)

        return error;
    }
    if (params.Id !== undefined) {
        const habitaciones = await getHabitacionesByHotelId(Number(data.hotel_id))
        const habitacionExistente = habitaciones?.find(habitacion => habitacion.acomodacion_id === Number(data.acomodacion_id) && habitacion.tipo_id === Number(data.tipo_id))
        if (habitacionExistente && habitacionExistente.id !== +params.Id) {
            toast.error('la habitación ' + habitacionExistente.habitacion + ' tiene la misma acomodación y tipo. La habitación actual ' + data.habitacion + ' no puede ser actualizada')
        
            return
        }

        await updateHabitacion(+params.Id, data);

        toast.success('Habitación editada correctamente')

    }else{
        return redirect('/habitaciones/' + data.hotel_id);
    }

    return redirect('/habitaciones/' + data.hotel_id);
}

export default function EditarHabitacion() {

    const { habitacion, tipos, acomodaciones } = useLoaderData() as { habitacion: Habitacion, tipos: Tipo[], acomodaciones: Acomodacion[] };
    
    const error = useActionData() as string;  

    const setValue = (value: number) => {
        const selectElement = document.getElementById('acomodacion_id') as HTMLSelectElement | null;
        if (selectElement) {
            selectElement.value = value.toString();
        }
    };
    
    setTimeout(() => setValue(habitacion.acomodacion_id), 200);

    const [acomodacionesFiltradas, setAcomodacionesFiltradas] = useState<Acomodacion[]>([]);
    
    useEffect(() => {
        setAcomodacionesFiltradas(acomodaciones.filter(acomodacion => {
            if (habitacion.tipo_id === 1) {
                return acomodacion.id === 1 || acomodacion.id === 2;
            } else if (habitacion.tipo_id === 2) {
                return acomodacion.id === 3 || acomodacion.id === 4;
            } else if (habitacion.tipo_id === 3) {
                return acomodacion.id === 1 || acomodacion.id === 2 || acomodacion.id === 3;
            } else {
                return true;
            }
        }));
    }, [habitacion.tipo_id, acomodaciones]);

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-yellow-500'>Hotel: {habitacion.hotel} - Editar Habitación</h2>
                <Link 
                    to={`/habitaciones/${habitacion.hotel_id}`}
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
                    <div className='mb-4 col-span-5'>
                        <input 
                            id="hotel_id" 
                            name='hotel_id'
                            type="hidden" 
                            value={habitacion.hotel_id}
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
                            defaultValue={habitacion.habitacion}
                        />
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
                            defaultValue={habitacion.descripcion}
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
                                defaultValue={habitacion.tipo_id}
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
                            Editar Habitación
                        </button>
                        <Link 
                            to={`/habitaciones/${habitacion.hotel_id}`}
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
