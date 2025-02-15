import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbEye, TbEyeClosed } from "react-icons/tb"
import ErrorMessage from "../components/ErrorMessage"
import { UpdatePasswordUser } from "../types"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updatePassowordUser } from "../api/userAPI"

export default function ProfileView() {

  const { data: user, isLoading, isError } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  const initialValues = {
    password: "",
    confirm_password: ""
  }

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate()
  const {mutate} = useMutation({
    mutationFn: updatePassowordUser,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      navigate('/profile')
      reset()
      toast('Se ha actualizado la contraseña del usuario', 
        {
          duration: 3000,
          position: 'bottom-center',
          style: {
            backgroundColor: "#feffcf",
            borderRadius: "5px",
            marginBottom: "5rem",
            width: "100%"
          }
        }
      )
    }
  })
  const handleChangePassword = (formData : UpdatePasswordUser) => {
    mutate(formData)
  }


  if (isLoading) return "Cargando..."
  if (isError) return <Navigate to="/login" />
  if (user) return (
    <div className="mt-7 space-y-5 w-full flex flex-col items-center">
      <section className="sm:w-full md:w-1/2 xl:w-1/4 space-y-2 text-lg bg-white p-5 rounded">
        <h1 className="text-3xl font-extrabold">Perfil del usuario</h1>
        <div
          className="space-y-2 mt-10"
        >
          <p>
            Nombre: <span className="font-semibold">{user.firstName}</span>
          </p>
          <p>
            Apellido: <span className="font-semibold">{user.lastName}</span>
          </p>
          <p>
            Email: <span className="font-semibold">{user.email}</span>
          </p>
        </div>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <label>Contraseña:</label>
          <div
            className="border border-gray-400 w-full rounded-md text-lg flex flex-row"
          >
            <input
              id="password"
              type={isVisible ? 'text' : 'password'}
              className="p-2 w-full rounded-md focus:outline-none"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            <button
              type="button"
              className="p-2 text-2xl bg-transparent"
              onClick={() => setIsVisible(!isVisible)}
              >
              {isVisible ? <TbEye /> : <TbEyeClosed />}
            </button>
          </div>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
          <label>Confirmar contraseña:</label>
          <div
            className="border border-gray-400 w-full rounded-md text-lg flex flex-row"
          >
            <input
              id="confirm_password"
              type={isVisible ? 'text' : 'password'}
              className="p-2 w-full rounded-md focus:outline-none"
              {...register("confirm_password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                validate: (value) => value === watch('password') || "Las contraseñas no coinciden"
              })}
            />
            <button
              type="button"
              className="p-2 text-2xl bg-transparent"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <TbEye /> : <TbEyeClosed />}
            </button>
          </div>
            {errors.password && (
              <ErrorMessage>{errors.confirm_password?.message}</ErrorMessage>
            )}
          <input
            value="Guardar cambios"
            type="submit"
            className="p-3 uppercase text-center font-semibold text-white bg-green-600 hover:bg-green-500 rounded"
          />
        </form>
      </section>
    </div>
  )
}
