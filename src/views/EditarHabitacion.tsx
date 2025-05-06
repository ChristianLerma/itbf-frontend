import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'react-toastify';
import { Acomodacion, Habitacion, Tipo } from '../types';
import { getAcomodaciones } from '../services/AcomodacionesService';
import { getTipos } from '../services/TiposService';
import { getHabitacionById, getHabitacionesByHotelId, updateHabitacion } from '../services/HabitacionesService';
import { useEffect, useState } from 'react';
import { getHotelById } from '../services/HotelesService';

// La función loader se ejecuta antes de que se renderice el componente
// Se utiliza para cargar datos necesarios para el componente
// La función recibe un objeto con los parámetros de la URL
// Se utiliza para obtener el id de la habitación
// Se utiliza para obtener los datos de la habitación, los tipos y las acomodaciones
export async function loader({params} : LoaderFunctionArgs) {
    // Se obtiene el id de la habitación de los parámetros de la URL
    if (params.Id !== undefined) {

        // Se obtienen las habitaciones del hotel de la API
        const habitacion = await getHabitacionById(+params.Id)
        if (habitacion === null || habitacion === undefined || !habitacion) {
            return redirect('/')
        }

        // Se obtienen los tipos de habitación de la API
        const tipos = await getTipos()
        if (tipos === null || tipos === undefined || !tipos) {
            return redirect('/')
        }
        
        // Se obtienen las acomodaciones de la API
        const acomodaciones = await getAcomodaciones()
        if (acomodaciones === null || acomodaciones === undefined || !acomodaciones) {
            return redirect('/')
        }

        // Se devuelve la habitación, los tipos y las acomodaciones
        // para que estén disponibles en el componente
        return {
            habitacion,
            tipos,
            acomodaciones, 
        };
    }

    // Si no se encuentra la habitación, se redirige a la página de habitaciones
    // o a la página de inicio
    return redirect('/');
}

// La función action se ejecuta cuando se envía el formulario
// Se utiliza para enviar los datos del formulario a la API
// La función recibe un objeto con los parámetros de la URL y el request
// Se utiliza para obtener los datos del formulario
export async function action({ request, params } : ActionFunctionArgs) {
    // Se obtienen los datos del formulario    // Se obtienen los datos del formulario y se convierten a un objeto
    // Se utiliza Object.fromEntries para convertir el FormData a un objeto
    // Se utiliza await request.formData() para obtener los datos del formulario
    // Se utiliza Object.fromEntries para convertir el FormData a un objeto
    const data = Object.fromEntries(await request.formData()); 

    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    
    if (error) {
        toast.error(error)

        return error;
    }

    // Se obtienen los parámetros de la URL
    if (params.Id !== undefined) {
        // Se obtienen las habitaciones del hotel de la API
        // Se utiliza Number(data.hotel_id) para convertir el id del hotel a un número
        const habitaciones = await getHabitacionesByHotelId(Number(data.hotel_id))

        // Se utiliza find para buscar la habitación que tiene el mismo id de acomodación y tipo
        // Se utiliza Number(data.acomodacion_id) para convertir el id de la acomodación a un número
        // Se utiliza Number(data.tipo_id) para convertir el id del tipo a un número
        // Se utiliza habitacionExistente para almacenar la habitación que se encontró
        const habitacionExistente = habitaciones?.find(habitacion => habitacion.acomodacion_id === Number(data.acomodacion_id) && habitacion.tipo_id === Number(data.tipo_id))

        // Se utiliza habitacionExistente para verificar si la habitación existe
        // Se utiliza habitacionExistente.id para verificar si el id de la habitación es diferente al id de la habitación que se está editando
        if (habitacionExistente && habitacionExistente.id !== +params.Id) {
            toast.error('la habitación ' + habitacionExistente.habitacion + ' tiene la misma acomodación y tipo. La habitación actual ' + data.habitacion + ' no puede ser actualizada')
        
            return
        }

        // Se verifica si el hotel existe utilizando el id del hotel
        // Se utiliza el método getHotelById para obtener el hotel
        const hotel = await getHotelById(Number(data.hotel_id))
        if (!hotel) {
            toast.error('El hotel no existe')
            
            return redirect('/');
        }
    
        // Se verifica si la cantidad de habitaciones supera la capacidad del hotel
        if (hotel.numero_habitaciones < ((hotel.total_habitaciones-Number(data.cantidad_antigua))+Number(data.cantidad))) {
            toast.error('La cantidad supera la capacidad del hotel (' + hotel.numero_habitaciones + ')')
    
            return
        }

        // Se utiliza updateHabitacion para actualizar la habitación en la API
        // Se utiliza +params.Id para convertir el id de la habitación a un número
        await updateHabitacion(+params.Id, data);

        // Se utiliza toast para mostrar un mensaje de éxito
        toast.success('Habitación editada correctamente')

    }else{
        // Si no se encuentra la habitación, se redirige a la página de habitaciones
        return redirect('/habitaciones/' + data.hotel_id);
    }

    // Se redirige a la página de habitaciones del hotel
    return redirect('/habitaciones/' + data.hotel_id);
}

// El componente EditarHabitacion se encarga de renderizar el formulario para editar una habitación
export default function EditarHabitacion() {
    
    // Se utiliza useLoaderData para obtener los datos de la habitación, los tipos y las acomodaciones
    const { habitacion, tipos, acomodaciones } = useLoaderData() as { habitacion: Habitacion, tipos: Tipo[], acomodaciones: Acomodacion[] };
    
    // Se utiliza useActionData para obtener los datos de la acción
    const error = useActionData() as string;  
    
    // Se utiliza useState para manejar el estado de las acomodaciones filtradas
    const setValue = (value: number) => {
        const selectElement = document.getElementById('acomodacion_id') as HTMLSelectElement | null;
        if (selectElement) {
            selectElement.value = value.toString();
        }
    };
    
    // Se utiliza setTimeout para esperar 200ms antes de establecer el valor de la acomodación
    // Se utiliza setValue para establecer el valor de la acomodación
    setTimeout(() => setValue(habitacion.acomodacion_id), 200);
    
    // Se utiliza useState para manejar el estado de las acomodaciones filtradas
    const [acomodacionesFiltradas, setAcomodacionesFiltradas] = useState<Acomodacion[]>([]);
    
    // Se utiliza useEffect para actualizar las acomodaciones filtradas cuando cambia el tipo de habitación
    // Se utiliza el hook useEffect para establecer el valor de la acomodación filtrada cuando se carga el componente
    // Se utiliza acomodaciones.filter para filtrar las acomodaciones según el tipo de habitación    
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
                    <div className='grid md:grid-cols-12 gap-4 sm:grid-cols-1 xs:flex flex-col'>
                        <div className='mb-4 md:col-span-10 xs:col-span-1'>
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
                        <div className='mb-4 md:col-span-2 xs:col-span-1'>
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
                                defaultValue={habitacion.cantidad}
                            />
                            <input
                                id="cantidad_antigua"
                                name='cantidad_antigua'
                                type="hidden" 
                                defaultValue={habitacion.cantidad}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-4 grid md:grid-cols-1 gap-4 sm:grid-cols-1 xs:flex flex-col'>
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
                <div className='grid md:grid-cols-2 gap-4 sm:grid-cols-1 xs:flex flex-col'>
                    <div className='mb-4 md:col-span-1 xs:col-span-1'>
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
                    <div className='mb-4 md:col-span-1 xs:col-span-1'>
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
                <div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <button 
                            type='submit'
                            className='grid-span-1 w-full bg-yellow-500 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-yellow-800 hover:cursor-pointer'
                        >
                            Editar Habitación
                        </button>
                        <Link 
                            // Se utiliza Link para redirigir a la página de habitaciones del hotel
                            // Se utiliza habitacion.hotel_id para obtener el id del hotel
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
