import { RiFileCopyLine } from "react-icons/ri"
import { RxCross1 } from "react-icons/rx";
import { Password } from "../../types"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

type CardPasswordProps = {
  password: Password,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordSelected: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CardPassword({ password, setIsOpen, setPasswordSelected }: CardPasswordProps) {

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast('Copiado en el portapapeles', {
        duration: 1500,
        position: 'bottom-center',
        style: {
          backgroundColor: "#feffcf",
          borderRadius: "5px",
          marginBottom: "5rem",
          width: "100%"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (passwordId : number) => {
    setIsOpen(true)
    setPasswordSelected(passwordId)
  }
  return (

    <section className="bg-white p-4 rounded shadow-md max-w-screen-lg w-full">
      <section className="flex flex-row justify-between items-center text-3xl">
        <Link
          to={`/passwords/edit/${password.id}`}
          className="hover:underline w-full"
        >
          <h1 className="font-extrabold ">
            {password.service}
          </h1>
        </Link>
        <div>
          <button
            className="text-slate-500 hover:text-red-600 "
            onClick={() => handleClick(password.id)}
          >
            <RxCross1/>
          </button>
        </div>
      </section>
      <section className="mt-2 mr-2 text-lg">
        <div>
          <button
            onClick={() => handleCopy(password.username)}
            className="flex flex-row gap-3 items-center"
          >
            <p>Usuario: <span className="font-semibold">{password.username}</span></p>
            <RiFileCopyLine />
          </button>

          <button
            onClick={() => handleCopy(password.password)}
            className="flex flex-row gap-3 items-center"
          >
            <p>Contraseña: <span>{"•".repeat(16)}</span></p>
            <RiFileCopyLine />
          </button>
        </div>
      </section>
    </section>
  )
}
