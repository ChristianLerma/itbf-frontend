import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { addHotel, getHotelesByNombre } from '../services/HotelesService';
import { toast } from 'react-toastify';

// La función action se ejecuta cuando se envía el formulario
// y se utiliza para procesar los datos enviados por el formulario
// En este caso, se utiliza para crear un nuevo hotel en el servidor
// y redirigir al usuario a la lista de hoteles
export async function action({ request } : ActionFunctionArgs) {
    // Se obtiene el objeto FormData del formulario enviado
    // y se convierte en un objeto JavaScript utilizando Object.fromEntries
    // para que se pueda trabajar con los datos de forma más sencilla
    // Se utiliza el método formData() del objeto request para obtener los datos del formulario
    // y se convierte en un objeto utilizando Object.fromEntries
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

    //Validar que el hotel no exista
    const hotel = (await getHotelesByNombre(typeof data.hotel === 'string' ? data.hotel : '')) ?? [];
    if (hotel.length > 0) {
        toast.error('El hotel ' + data.hotel + ' ya existe')
        
        // Si el hotel ya existe, se muestra un mensaje de error y se redirige al usuario a la lista de hoteles
        return 'El hotel ' + data.hotel + ' ya existe';
    }

    // Se crea un nuevo hotel utilizando la función addHotel
    await addHotel(data);

    // Se muestra un mensaje de éxito utilizando la librería toastify
    toast.success('Hotel creado correctamente')

    // Se redirige al usuario a la lista de hoteles utilizando la función redirect
    return redirect('/');
}

// El componente NuevoHotel se encarga de mostrar el formulario para crear un nuevo hotel
// y de procesar los datos enviados por el formulario
export default function NuevoHotel() {
    
    // Se utiliza el hook useActionData para obtener los datos enviados por el formulario
    // y se asignan a la variable error
    const error = useActionData() as string;

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-black text-slate-500'>Crear Hotel</h2>
                <Link 
                    to="/"
                    className='bg-indigo-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-indigo-800'
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
                        defaultValue={""}
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
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-2 gap-4'>
                        <button 
                            type='submit'
                            className='grid-span-1 w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-bold text-sm shadow-sm hover:bg-indigo-500 hover:cursor-pointer'
                            >
                            Crear Hotel
                        </button>
                        <Link 
                            to="/"
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
