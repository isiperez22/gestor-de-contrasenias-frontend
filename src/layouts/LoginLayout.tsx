import { Outlet } from 'react-router-dom'

export default function LoginLayout() {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <div className='py-10 lg:py-20 mx-auto w-[370px]'>
          <h1 className='text-5xl font-extrabold text-center text-green-600'>Gestor de contraseñas</h1>
          <div className='mt-10'>
            <Outlet/>
          </div>
        </div>
      </div>
  )
}
