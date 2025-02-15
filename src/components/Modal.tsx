import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RxCross1 } from "react-icons/rx";
import { deletePassword, getPasswordById } from "../api/passwordAPI";
import { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";


type ModalProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  passwordSelected: number | null
  setPasswordSelected: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Modal({ isOpen, setIsOpen, passwordSelected, setPasswordSelected }: ModalProps) {

  const queryClient = useQueryClient()
  const [inputText, setInputText] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputText(e.target.value);
  }

  const { data } = useQuery({
    queryKey: ["modalPassword"],
    queryFn: () => getPasswordById(passwordSelected!),
    retry: false,
    enabled: !!passwordSelected
  })

  const { mutate } = useMutation({
    mutationFn: deletePassword,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passwords'] })
      setIsOpen(!isOpen)
      toast('Se ha eliminado correctamente',
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

  const expectedPhrase = `Eliminar-Servicio-${data?.service}`;
  

  const handleConfirmDelete = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    mutate(passwordSelected!)
  }

  useEffect(() => {
    if (!isOpen) {
      setPasswordSelected(null)
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <section className="bg-slate-100 p-5 rounded text-xl shadow-lg sm:w-4/5 md:w-1/3">
            <div className="text-3xl flex flex-row w-full justify-between">
              <h1 className="font-bold">Eliminar datos</h1>
              <button onClick={() => setIsOpen(false)} className="text-slate-500">
                <RxCross1 />
              </button>
            </div>
            <p className="mt-2">Escriba la siguiente frase para realizar la acción:</p>
            <p className="mt-2 font-semibold">Eliminar-Servicio-{data?.service}</p>
            <form
              onSubmit={handleConfirmDelete}            
              >
              <input
                type="text"
                className="px-4 py-2 mt-2 border border-gray-300 bg-slate-50 w-full rounded"
                placeholder="Escriba la frase..."
                value={inputText}
                onChange={handleChange}
              />
              <button
                className="mt-4 px-4 py-2 w-full bg-slate-100 text-red-600 font-semibold rounded border border-red-600
                            hover:bg-red-600 hover:text-white transition-colors disabled:border-gray-400 disabled:text-gray-400 
                            disabled:bg-transparent"
                disabled={inputText !== expectedPhrase}
              >
                Confirmar accion
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
