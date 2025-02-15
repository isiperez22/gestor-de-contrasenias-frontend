import { User } from "../types";


const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllUsers(){
  try {
    const url = apiUrl + '/admin/user';
    const token = localStorage.getItem('AUTH_TOKEN');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener el usuario')
    }

    const data : User[] = await response.json();
  
    return data;

  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

export async function deleteUser(userId: User['id']) {
  try {
    const url = apiUrl + `/admin/user/delete/${userId}`;
    const token = localStorage.getItem('AUTH_TOKEN');
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    return data;
    
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}
