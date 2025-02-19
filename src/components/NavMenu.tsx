import { useQueryClient } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { HiMiniBars3 } from "react-icons/hi2";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

export default function NavMenu() {

  const [isOpen, setIsOpen] = useState(false);

  const naviagate = useNavigate()

  const { data } = useAuth()

  const queryClient = useQueryClient()
  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.removeQueries({ queryKey: ['authenticatedUser'] })
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

        {/* <div className="items-center hidden lg:flex">
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
          <button className="text-white lg:hidden mx-3">
            <HiMiniBars3 />
          </button> */}
        <div className={`lg:flex ${isOpen ? "translate-x-0" : "translate-x-full"} 
              flex-col lg:flex-row items-start lg:items-center 
              absolute lg:relative top-0 right-0 w-1/2 h-full lg:w-auto bg-green-600 lg:bg-transparent 
              px-5 lg:p-0 text-lg lg:text-base transition-transform duration-300 ease-in-out 
              lg:translate-x-0`}>
          <div className="flex flex-row items-end my-10">
            <button
              className="text-white lg:hidden mx-1 text-4xl self-end ml-auto"
              type="button"
              onClick={() => setIsOpen(!isOpen)}>
              <RxCross1 />
            </button>
          </div>
          <div className="flex flex-col lg:flex-row">
            <Link
              to="/profile"
              className="flex flex-row items-center gap-1 font-semibold p-3 text-white border-b-2 border-slate-100 lg:border-none"
            >
              Hola, {data?.firstName} <CgProfile />
            </Link>

            <button
              className="flex flex-row items-center gap-1 font-semibold p-3 text-white border-b-2 border-slate-100 lg:border-none"
              onClick={handleLogout}
            >
              Salir <RiLogoutBoxRLine />
            </button>
          </div>
        </div>

        <button
          className="text-white lg:hidden mx-3"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMiniBars3 size={36} />
        </button>
      </div>
    </header>
  )
}
