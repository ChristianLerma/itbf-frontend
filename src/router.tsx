import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Hoteles, { loader as hotelesLoader } from './views/Hoteles';
import NuevoHotel, { action as nuevoHotelAction } from './views/NuevoHotel';
import EditarHotel, { loader as editarHotelLoader, action as editarHotelAction } from './views/EditarHotel';
import { action as eliminarHotelAction } from './components/HotelDetails';
import Habitaciones, { loader as HabitacionesLoader } from './views/Habitaciones';
import { action as eliminarHabitacionAction } from './components/HabitacionDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Hoteles />,
                loader: hotelesLoader,
            },
            {
                path: 'hoteles/nuevo',
                element: <NuevoHotel />,
                action: nuevoHotelAction,
            },
            {
                path: 'hoteles/:Id/editar', //ROA Parent - Resource Oriented Architecture
                element: <EditarHotel />,
                loader: editarHotelLoader,
                action: editarHotelAction,
            },
            {
                path: 'hoteles/:Id/eliminar', //ROA Parent - Resource Oriented Architecture
                action: eliminarHotelAction,
            },
            {
                path: 'habitaciones/:Id',
                element: <Habitaciones />,
                loader: HabitacionesLoader,
            },
            {
                path: 'habitaciones/:Id/eliminar', //ROA Parent - Resource Oriented Architecture
                action: eliminarHabitacionAction,
            },
        ]    
    },
]);