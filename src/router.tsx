import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Hoteles, { loader as hotelesLoader } from './views/Hoteles';
import NuevoHotel, { action as nuevoHotelAction } from './views/NuevoHotel';
import EditarHotel, { loader as editarHotelLoader, action as editarHotelAction } from './views/EditarHotel';
import { action as eliminarHotelAction } from './components/HotelDetails';
import Habitaciones, { loader as HabitacionesLoader } from './views/Habitaciones';
import { action as eliminarHabitacionAction } from './components/HabitacionDetails';
import NuevaHabitacion, { loader as HabitacionNuevaLoader, action as nuevaHabitacionAction } from './views/NuevaHabitacion';
import EditarHabitacion, { loader as editarHabitacionLoader, action as editarHabitacionAction } from './views/EditarHabitacion';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                // La ruta index se utiliza para definir la ruta por defecto de un grupo de rutas anidadas
                // En este caso, la ruta por defecto es la ruta de los hoteles
                index: true,
                element: <Hoteles />,
                loader: hotelesLoader,
            },
            {
                // La ruta /hoteles/nuevo se utiliza para crear un nuevo hotel
                // y se renderiza el componente NuevoHotel
                // La función action se utiliza para manejar la acción de crear un nuevo hotel
                // y se pasa como prop al componente NuevoHotel 
                // La función action se ejecuta cuando se envía el formulario de creación de un nuevo hotel
                // y se encarga de enviar los datos del nuevo hotel al servidor
                path: 'hoteles/nuevo',
                element: <NuevoHotel />,
                action: nuevoHotelAction,
            },
            {
                // La ruta /hoteles/:Id/editar se utiliza para editar un hotel existente
                // y se renderiza el componente EditarHotel
                // La función loader se utiliza para cargar los datos del hotel a editar
                // y se pasa como prop al componente EditarHotel
                // La función action se utiliza para manejar la acción de editar un hotel
                path: 'hoteles/:Id/editar', //ROA Parent - Resource Oriented Architecture
                element: <EditarHotel />,
                loader: editarHotelLoader,
                action: editarHotelAction,
            },
            {
                // La ruta /hoteles/:Id/eliminar se utiliza para eliminar un hotel existente
                // y se renderiza el componente HotelDetails
                // La función action se utiliza para manejar la acción de eliminar
                // y se pasa como prop al componente HotelDetails
                // La función action se ejecuta cuando se envía el formulario de eliminación
                path: 'hoteles/:Id/eliminar', //ROA Parent - Resource Oriented Architecture
                action: eliminarHotelAction,
            },
            {
                //La ruta habitaciones/:Id se utiliza para mostrar las habitaciones de un hotel
                // y se renderiza el componente Habitaciones
                // La función loader se utiliza para cargar los datos de las habitaciones del hotel
                path: 'habitaciones/:Id',
                element: <Habitaciones />,
                loader: HabitacionesLoader,
            },
            {
                //La ruta habitaciones/:Id/eliminar se utiliza para eliminar una habitación existente
                // y se renderiza el componente HabitacionDetails
                // La función action se utiliza para manejar la acción de eliminar
                path: 'habitaciones/:Id/eliminar', //ROA Parent - Resource Oriented Architecture
                action: eliminarHabitacionAction,
            },
            {
                //La ruta habitaciones/:Id/nueva se utiliza para crear una nueva habitación
                // y se renderiza el componente NuevaHabitacion
                // La función loader se utiliza para cargar los datos del hotel al que pertenece la habitación
                // La función action se utiliza para manejar la acción de crear una nueva habitación
                path: 'habitaciones/:Id/nueva',
                element: <NuevaHabitacion />,
                loader: HabitacionNuevaLoader,
                action: nuevaHabitacionAction,
            },
            {
                //La ruta habitaciones/:Id/editar se utiliza para editar una habitación existente
                // y se renderiza el componente EditarHabitacion
                // La función loader se utiliza para cargar los datos de la habitación a editar
                // La función action se utiliza para manejar la acción de editar una habitación
                path: 'habitaciones/:Id/editar',
                element: <EditarHabitacion />,
                loader: editarHabitacionLoader,
                action: editarHabitacionAction,
            }
        ]    
    },
]);