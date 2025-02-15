import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PasswordData } from "../../types";
import { useForm } from "react-hook-form";
import FormPassword from "../../components/passwords/FormPassword";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPasswordById, updatePassword } from "../../api/passwordAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function UpdatePasswordView() {

  const { passwordId } = useParams()
  const pwdId = Number(passwordId)


  const { data: password, isLoading, error } = useQuery({
    queryKey: ['password', pwdId],
    queryFn: () => getPasswordById(pwdId),
    retry: false,
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passwords'] })
      navigate('/passwords')
      toast('Se ha actualizado correctamente', 
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

  const initialValues: PasswordData = {
    service: '',
    username: '',
    password: ''
  };

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({defaultValues: initialValues})

  useEffect(() => {
    if (password) {
      reset({
        service: password.service,
        username: password.username,
        password: password.password,
      });
    }
  }, [password, reset]);

  const handleUpdatePassword = (formData : PasswordData) => {
    const data = {
        formData,
        pwdId
    }
    mutate(data)
  }
  
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar la contraseña</p>;
  if (!password) return <p>No se encontró la contraseña</p>;
  return (
    <section>
      <Link
        to="/passwords"
        className="flex flex-row gap-1 items-center text-white uppercase 
                  font-semibold bg-green-600 hover:bg-green-500 p-3 rounded w-32 mt-3"
      >
        <MdArrowBack size={32} /> <p className="text-lg">Volver</p>
      </Link>
      <h1 className="font-extrabold text-4xl text-center mt-3">Actualiza la contraseña</h1>
      <div
        className="flex justify-center"
      >
        <form
          className="space-y-5 p-8 bg-white mt-7 w-[370px] rounded"
        onSubmit={handleSubmit(handleUpdatePassword)}
        >
          <FormPassword
            register={register}
            errors={errors}
            setValue={setValue}
            getValues = {getValues}
          />
          <input
            type="submit"
            value='Guardar cambios'
            className="text-white text-lg bg-green-600 hover:bg-green-500 p-3 text-center w-full uppercase font-semibold rounded"
          />
        </form>
      </div>
    </section>
  )
}

