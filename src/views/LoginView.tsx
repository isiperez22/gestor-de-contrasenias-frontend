import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { LoginUser } from "../types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authAPI";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useState } from "react";
import ErrorMessageForm from "../components/ErrorMessageForm";

export default function LoginView() {

  const [isVisible, setIsVisible] = useState(false)
  const [isError , setIsError] = useState('')

  const initialValues: LoginUser = {
    email: '',
    password: '',
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('AUTH_TOKEN', data.token);
        navigate('/passwords');
      } else {
        setIsError('Error en las credenciales')
      }
    }
  })

  const handleLogin = (formData: LoginUser) => {
    mutate(formData)
  }

  

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-5 p-8 bg-white"
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-xl">Email</label>
          <input
            id="email"
            type="text"
            className="p-2 w-full border-gray-400 border rounded-md text-xl focus:outline-none"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-xl">Contraseña</label>
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
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
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
        </div>
        <input
          type="submit"
          value="Iniciar sesion"
          className="text-xl w-full p-3 font-semibold uppercase text-white bg-green-600 hover:bg-green-500" 
          />

          {isError && <ErrorMessageForm>{isError}</ErrorMessageForm>}

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/register'}
          className="text-center font-normal"
        >
          ¿No tienes cuenta? Registrate aqui
        </Link>
      </nav>
    </>
  )
}
