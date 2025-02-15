import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { PasswordData } from "../../types"
import { useEffect, useState } from "react"
import { TbEye, TbEyeClosed } from "react-icons/tb"
import { generateRandomPassword } from "../../utils"
import { IoReload } from "react-icons/io5"


type FormPasswordProps = {
  register: UseFormRegister<PasswordData>,
  errors: FieldErrors<PasswordData>,
  setValue: UseFormSetValue<PasswordData>
  getValues: UseFormGetValues<PasswordData>
}

export default function FormPassword({ register, errors, setValue, getValues }: FormPasswordProps) {

  const [isVisible, setIsVisible] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleClick = () => {
    setInputText(generateRandomPassword)
    setValue('password', inputText)
  }

  useEffect(() => {
    setInputText(getValues('password') || '')
  }, [getValues])

  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Servicio:</label>
        <input
          id="service"
          type="text"
          className="p-2 w-full border-gray-400 border rounded-md text-lg"
          {...register('service', {
            required: "Este campo es obligatorio"
          })}
        />
        {errors.service &&
          <ErrorMessage>{errors.service.message}</ErrorMessage>
        }
      </div>
      <div className="flex flex-col">
        <label className="text-xl">Usuario:</label>
        <input
          id="username"
          type="text"
          className="p-2 w-full border-gray-400 border rounded-md text-lg"
          {...register('username', {
            required: "Este campo es obligatorio"
          })}
        />
        {errors.username &&
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        }
      </div>
      <div className="flex flex-col">
        <label className="text-xl">Contraseña:</label>
        <div
          className="border border-gray-400 w-full rounded-md text-lg flex flex-row"
        >
          <input
            id="password"
            value={inputText}
            type={isVisible ? 'text' : 'password'}
            className="p-2 w-full rounded-md focus:outline-none"
            {...register("password", {
              required: "La contraseña es obligatoria",
              onChange: (e) => {
                setInputText(e.target.value);
                setValue("password", e.target.value);
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
          <button
            type="button"
            className="p-2 text-2xl bg-transparent"
            onClick={handleClick}
          >
            <IoReload />
          </button>
        </div>
        {errors.password &&
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        }
      </div>
    </>
  )
}
