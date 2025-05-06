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
            <div className='mx-auto max-w-6xl p-10'>
                <h1 className='text-4xl font-extrabold text-white'>
                    Administrador de Hoteles
                </h1>
            </div>
        </header>

        <main className='mt-10 mx-auto max-w-11/12 p-10 bg-white shadow'>
            <Outlet />

            <ToastContainer />            
        </main>
    </>
  );
}
