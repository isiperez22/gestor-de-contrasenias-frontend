import { Password, PasswordData, passwordFormSchema, Passwords } from "../types";

type PasswordAPItype = {
  formData : PasswordData,
  pwdId : Password['id']
}


const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllPasswords() {
  try {
    const url = apiUrl + '/password/my-password'
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}` }
    })

    const data: Passwords = await response.json()
    return data;
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

export async function getPasswordById(id : Password['id']) {
  try {
    const url = apiUrl + `/password/my-password/${id}`
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}` }
    })
    if(!response.ok) {
      throw new Error('Error al realizar la peticion')
    }
    const data = await response.json() //Le digo que los datos son tipo Password
    const result = passwordFormSchema.safeParse(data)
    if(result.success){
      return result.data
    }
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

export async function createPassword(formData: PasswordData) {
  try {
    const url = apiUrl + "/password/create";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}


export async function updatePassword({formData, pwdId}: Pick<PasswordAPItype, 'formData' | 'pwdId'>) {
  try {
    const url = apiUrl + `/password/my-password/${pwdId}`;
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

export async function deletePassword(passwordId: Password['id']) {
  try {
    const url = apiUrl + `/password/my-password/delete/${passwordId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}