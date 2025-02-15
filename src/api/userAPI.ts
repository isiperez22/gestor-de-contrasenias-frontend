import { UpdatePasswordUser, User } from "../types";


const apiUrl = import.meta.env.VITE_API_URL;

export async function getUserById(){
  try {
    const url = apiUrl + '/user/me';
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

    const data : User = await response.json();
  
    return data;

  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

export async function updatePassowordUser(formData : UpdatePasswordUser) {
  try {
    const url = apiUrl + `/user/`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al conectar:', error);
  }
}