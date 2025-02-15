import { useQuery } from "@tanstack/react-query";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../api/adminApi";
import UsersTable from "../../components/admin/UsersTable";

export default function AdminView() {

  const { data: user } = useQuery({
    queryKey: ['Allusers'],
    queryFn: getAllUsers,
    retry: false
  })


  return (
    <section>
      <Link
        to="/passwords"
        className="flex flex-row gap-1 items-center text-white uppercase 
                  font-semibold bg-green-600 hover:bg-green-500 p-3 rounded w-32 mt-3"
      >
        <MdArrowBack size={32} /> <p className="text-lg">Volver</p>
      </Link>
      <h1 className="font-extrabold text-4xl text-center mt-3">Gestionar usuarios</h1>
      <section
        className="w-full mt-10 flex flex-row justify-center"
      >
        <table
          className="sm:w-full md:w-2/3 mt-5 table-auto"
        >
          <thead
            className="bg-green-800 text-white"
          >
            <tr>
              <th className="text-lg w-48">
                Email
              </th>
              <th className="text-lg hidden md:table-cell w-48">
                Nombre
              </th>
              <th className="text-lg hidden md:table-cell w-48">
                Apellido
              </th>
              <th
                className="text-lg w-48"
              >
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody
            className="text-center"
          >
            {
              user?.map(user => (
                <UsersTable
                  key={user.id}
                  user={user}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  )
}
