import { useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { PasswordData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createPassword } from "../../api/passwordAPI";
import toast from "react-hot-toast";
import FormPassword from "../../components/passwords/FormPassword";
import { useEffect } from "react";

export default function CreatePasswordView() {

  const initialValues: PasswordData = {
    service: '',
    username: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ defaultValues: initialValues })

  useEffect(() => {
    reset({
        service: '',
        username: '',
        password: '',
    })
  }, [reset])


  const navigate = useNavigate()
  const {mutate} = useMutation({
    mutationFn: createPassword,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      navigate('/passwords')
      toast('Se ha agreagado correctamente', 
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

  const handleSavePassword = (formData : PasswordData) => {
    mutate(formData)
  }

  return (
    <section>
      <Link
        to="/passwords"
        className="flex flex-row gap-1 items-center text-white uppercase 
                  font-semibold bg-green-600 hover:bg-green-500 p-3 rounded w-32 mt-3"
      >
        <MdArrowBack size={32} /> <p className="text-lg">Volver</p>
      </Link>
      <h1 className="font-extrabold text-4xl text-center mt-3">Guardar nueva contraseña</h1>
      <div
        className="flex justify-center"
      >
        <form
          className="space-y-5 p-8 bg-white mt-7 w-[370px] rounded"
          onSubmit={handleSubmit(handleSavePassword)}
        >
          <FormPassword
            register = {register}
            errors = {errors}
            setValue = {setValue}
            getValues = {getValues}
          />
          <input
            type="submit"
            value='Guardar contraseña'
            className="text-white text-lg bg-green-600 hover:bg-green-500 p-3 text-center w-full uppercase font-semibold rounded"
          />
        </form>
      </div>
    </section>
  )
}
