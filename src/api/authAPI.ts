import { LoginUser, RegisterUser } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function createUser(formData: RegisterUser) {
  try {
    const url = apiUrl + '/auth/register'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('No se ha podido registrar el usuario')
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }

}

export async function loginUser(formData: LoginUser){
  try {
    const url = apiUrl + '/auth/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('No se ha podido iniciar sesión')
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}