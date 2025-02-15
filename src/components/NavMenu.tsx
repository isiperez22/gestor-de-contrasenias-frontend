import { useQueryClient } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavMenu() {

  const naviagate = useNavigate()

  const {data} = useAuth()

  const queryClient = useQueryClient()
  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.removeQueries({queryKey: ['authenticatedUser']})
    naviagate('/login')
  }

  return (
    <header className="p-4 bg-green-600">
        <div className="container flex justify-between h-16 mx-auto">
          <Link
            to="/passwords"
            className="flex items-center space-x-2">
            <p className="text-white font-bold uppercase text-2xl">Gestor de contraseñas</p>
          </Link>

          <div className="items-center hidden lg:flex">
            <Link
              to="/profile"
              className="flex flex-row items-center gap-1 font-semibold p-3 text-white"
            >
              Hola, {data?.firstName}<CgProfile />
            </Link>

            <button
              className="flex flex-row items-center gap-1 font-semibold p-3 text-white"
              onClick={handleLogout}
            >Salir <RiLogoutBoxRLine />
            </button>
          </div>
          <button className="p-4 lg:hidden">
            <p>a</p>
          </button>
        </div>
      </header>
  )
}
