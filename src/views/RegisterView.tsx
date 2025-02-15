import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterUser } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/authAPI";


export default function RegisterView() {

  const initialValues : RegisterUser = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm_password: '',
    role: 'USER',
  }

  const {register, handleSubmit, watch, formState: {errors}} = useForm({defaultValues: initialValues});

  const navigate = useNavigate()

  const {mutate} = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      navigate('/login')
    }
  })

  const handleRegister = (formData: RegisterUser) => {
    mutate(formData)
  }
  return (
    <form 
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-5 p-8 bg-white"
    >
      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Email</label>
        <input 
          id="email"
          type="text"
          className='p-2 w-full border-gray-400 border rounded-md text-xl'
          {...register("email", {
            required: "El Email es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email no válido",
            },
          })} 
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>
        )}
      </div>      
      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Nombre</label>
        <input 
          id="firstName"
          type="text"
          className='p-2 w-full border-gray-400 border rounded-md text-xl'
          {...register("firstName", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
          })
          }  
        />
        {errors.firstName && (
          <ErrorMessage>{errors.firstName.message?.toString()}</ErrorMessage>
        )}
      </div> 
      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Apellido</label>
        <input 
          id="lastName"
          type="text"
          className='p-2 w-full border-gray-400 border rounded-md text-xl'  
          {...register("lastName", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
          })
          }
        />
        {errors.lastName && (
          <ErrorMessage>{errors.lastName.message?.toString()}</ErrorMessage>
        )}
      </div> 
      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Contraseña</label>
        <input 
          id="password"
          type="password"
          className='p-2 w-full border-gray-400 border rounded-md text-xl'  
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })
          }
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message?.toString()}</ErrorMessage>
        )}
      </div> 
      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Repetir contraseña</label>
        <input 
          id="confirm_password"
          type="password"
          className='p-2 w-full border-gray-400 border rounded-md text-xl'  
          {...register("confirm_password", {
            required: "El nombre es obligatorio",
            validate: (value) => value === watch('password') || "Las contraseñas no coinciden"
          })
          }
        />
        {errors.confirm_password && (
          <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
        )}
      </div> 

      <input 
          type="submit"
          value="Registrarse"
          className="text-xl w-full p-3 font-semibold uppercase text-white bg-green-600 hover:bg-green-500" />
    </form>
  )
}
