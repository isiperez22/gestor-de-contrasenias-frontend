import { GoTrash } from "react-icons/go"
import { User } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../../api/adminApi"
import toast from "react-hot-toast"


type UsersTableProps = {
  user : User
}

export default function UsersTable({user} : UsersTableProps) {


  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['Allusers']})
      toast('Se ha eliminado correctamente', 
        {
          duration: 3000,
          position: 'bottom-center',
          style: {
            backgroundColor: "#ffcfcf",
            borderRadius: "5px",
            marginBottom: "5rem",
            width: "100%"
          }
        }
      )
    }
  })


  const handleClick = (userId : User['id']) => {
    mutate(userId)
  }

  return (
    <tr className="border-b border-gray-400">
      <td className="text-lg">
        {user.email}
      </td>

      <td className="text-lg hidden md:table-cell">
        {user.firstName}
      </td>

      <td className="text-lg hidden md:table-cell">
        {user.lastName}
      </td>

      <td>
        <button 
          onClick={() => handleClick(user.id)}
          className="bg-red-600 text-white p-3 m-1 rounded justify-center">
          <GoTrash />
        </button>
      </td>
    </tr>
  )
}
