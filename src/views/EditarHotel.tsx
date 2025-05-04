import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getHotelsById, updateHotel } from '../services/HotelesService';
import { Hotel } from '../types';
import { toast } from 'react-toastify';

export async function loader({params} : LoaderFunctionArgs) {
    if (params.Id !== undefined) {
        const hotel = await getHotelsById(+params.Id)
        if (hotel === null || hotel === undefined || !hotel) {
            return redirect('/')
        }
        
        return hotel;
    }
    
    return redirect('/')
}

export async function action({ request, params } : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    
    // Validar que el email tenga un formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof data.email === 'string' && !emailRegex.test(data.email)) {
        error = 'El email no es válido';
    }

    // Validar que la pagina web tenga un formato correcto
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (typeof data.pagina_web === 'string' && !urlRegex.test(data.pagina_web)) {
        error = 'La página web del hotel no es válida';
    }
    
    if (error) {
        toast.error(error)

        return error;
    }
    if (params.Id !== undefined) {
        await updateHotel(+params.Id, data);

        toast.success('Hotel editado correctamente')

    }else{
        return redirect('/')
    }

    return redirect('/');
}

export default function EditarHotel() {

    const hotel = useLoaderData() as Hotel;
    
    const error = useActionData() as string;

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-green-700'>Editar Hotel</h2>
                <Link 
                    to="/"
                    className='bg-gray-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-gray-400'
                >
                    Volver a Hoteles
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form 
                className='bg-white shadow-md rounded-lg p-10'
                method='post'
            >
                <div className='mb-4'>
                    <div className='grid grid-cols-7 gap-4'>
                        <div className='mb-4 col-span-5'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="hotel">
                                Hotel
                            </label>
                            <input 
                                id="hotel" 
                                name='hotel'
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Nombre del Hotel'
                                defaultValue={hotel.hotel}
                            />
                        </div>
                        <div className='mb-4 col-span-2'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="numero_habitaciones">
                                Número de Habitaciones
                            </label>
                            <input 
                                id="numero_habitaciones" 
                                name='numero_habitaciones'
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Número de Habitaciones'
                                defaultValue={hotel.numero_habitaciones}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <label 
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor="descripcion">
                        Descripción 
                    </label>
                    <textarea 
                        id="descripcion" 
                        name='descripcion'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50"
                        placeholder='Descripción del Hotel'
                        rows={3}
                        defaultValue={hotel.descripcion}
                    ></textarea>
                </div>
                <div className='mb-4'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='mb-4 col-span-2'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="direccion">
                                Dirección
                            </label>
                            <input 
                                id="direccion"
                                name='direccion'
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Dirección del Hotel'
                                defaultValue={hotel.direccion}
                            />
                        </div>
                        <div className='mb-4'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="telefono">
                                Teléfono
                            </label>
                            <input 
                                id="telefono" 
                                name='telefono'
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Teléfono del Hotel'
                                defaultValue={hotel.telefono}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='mb-4 col-span-1'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="email">
                                Email
                            </label>
                            <input 
                                id="email"
                                name='email'
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50"
                                placeholder='Email del Hotel'
                                defaultValue={hotel.email}
                            />
                        </div>
                        <div className='mb-4 col-span-2'>
                            <label 
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor="pagina_web">
                                Página Web
                            </label>
                            <input 
                                id="pagina_web" 
                                name='pagina_web'
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50" 
                                placeholder='Página Web del Hotel'
                                defaultValue={hotel.pagina_web}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button 
                        type='submit'
                        className='w-full bg-green-700 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-green-500 hover:cursor-pointer'
                    >
                        Editar Hotel
                    </button>
                </div>
            </Form>
        </>
    );
}
