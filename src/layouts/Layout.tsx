import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
