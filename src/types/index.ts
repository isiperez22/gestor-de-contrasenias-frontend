import {z} from 'zod';


//Usuarios

export const RoleSchema = z.enum(["ADMIN", "USER"])

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  confirm_password: z.string(),
  role : RoleSchema
})

export type User = z.infer<typeof userSchema>
export type LoginUser = Pick<z.infer<typeof userSchema>, 'email' | 'password'>
export type RegisterUser = Pick<z.infer<typeof userSchema>, 'email' | 'password' | 'confirm_password' | 'firstName' | 'lastName' | 'role'>
export type UpdatePasswordUser = Pick<z.infer<typeof userSchema>, 'password' | 'confirm_password'>


export const passwordSchema = z.object({
  id: z.number(),
  service: z.string(),
  username: z.string(),
  password: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
  user: userSchema
})

export const passwordFormSchema = 
  passwordSchema.pick({
    service: true,
    username: true,
    password: true
  })

export const passwordsSchema = z.array(passwordSchema)

export type Password = z.infer<typeof passwordSchema>
export type Passwords = z.infer<typeof passwordsSchema>
export type PasswordData = Pick<z.infer<typeof passwordSchema>, 'service' | 'username' | 'password'>