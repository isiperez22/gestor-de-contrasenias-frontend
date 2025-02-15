import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllPasswords } from "../../api/passwordAPI";
import CardPassword from "../../components/passwords/CardPassword";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function AllPasswordsView() {

  const { data: user, isLoading, isError } = useAuth();

  const {data : passwords} = useQuery({
    queryKey: ['passwords'],
    queryFn: getAllPasswords,
    retry: false
  })

  const [isOpen, setIsOpen] = useState(false)
  const [passwordSelected, setPasswordSelected] = useState<number | null>(null)
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  if (isError || !user) {
    return <Navigate to="/login" />;
  }
  if(user)return (
    <>
      <div className="flex flex-row gap-5 mt-3 justify-center">
        <Link
          to="/passwords/new"
          className="p-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded uppercase 
                    text-center"
        >
          Crear nueva contraseña
        </Link>

        {user.role.includes("ADMIN") && (
          <Link
            to="/admin/users"
            className="p-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded uppercase 
                      text-center "
          >
            Gestionar usuarios
          </Link>
        )}
      </div>

      <div className="mt-7 space-y-5 w-full flex flex-col items-center">
        {passwords?.map(password => (
          <CardPassword 
            key={password.id}
            password={password}
            setIsOpen={setIsOpen}
            setPasswordSelected ={setPasswordSelected}
            />
        )) }
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        passwordSelected = {passwordSelected}
        setPasswordSelected = {setPasswordSelected}
      />
    </>
  )

}
