import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'

// Este componente se utiliza para mostrar el layout de la aplicación
// Contiene el header y el main de la aplicación
// El header contiene el título de la aplicación    
// El main contiene el contenido de la aplicación
// El contenido de la aplicación se carga dinámicamente utilizando el componente Outlet de react-router-dom
// El componente Outlet se utiliza para renderizar el contenido de la ruta actual
export default function Layout() {
  return (
    <>
        <header className='bg-cyan-700'>
            <div className='mx-auto md:max-w-6xl p-8 md:flex md:justify-between md:items-center sm:max-sm:w-1/12 sm:px-5 sm:py-5 xs:px-2 xs:py-2'>
                <h1 className='text-4xl font-extrabold text-white'>
                    Administrador de Hoteles
                </h1>
            </div>
        </header>

        <main className='mt-10 mx-auto max-w-11/12 p-10 bg-white shadow sm:px-5 sm:py-5 xs:px-2 xs:py-2'>
            <Outlet />

            <ToastContainer />            
        </main>
    </>
  );
}
