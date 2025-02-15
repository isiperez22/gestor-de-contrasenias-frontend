import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../api/userAPI"


export const useAuth = () =>{
  const {data, isLoading, isError}  = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: getUserById,
    retry: false
  })

  return {data, isLoading, isError};
}