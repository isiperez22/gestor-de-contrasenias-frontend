export const generateRandomPassword = () => {
  // Definir los caracteres posibles
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  // Generar la contraseña aleatoria
  const contraseña = Array.from({length: 18}, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');

  // Mostrar la contraseña generada
  return contraseña
}
