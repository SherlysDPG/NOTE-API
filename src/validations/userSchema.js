import { z } from 'zod';

const signUp = z.object({
  body: z.object({
    username: z
      .string()
      .nonempty('El usuario es un campo requerido')
      .min(8, 'el nombre de usuario debe de tener un mínimo 8 caracteres'),
    email: z
      .string()
      .nonempty('El correo es un campo requerido')
      .email({ message: 'Introduzca un correo valido' }),
    password: z
      .string()
      .nonempty('La contraseña es un campo requerido')
      .min(8, 'La contraseña debe de tener un mínimo 8 caracteres'),
  }),
});

const signIn = z.object({
  body: z.object({
    email: z
      .string()
      .nonempty('El correo es un campo requerido')
      .email({ message: 'Introduzca un correo valido' }),
    password: z
      .string()
      .nonempty('La contraseña es un campo requerido')
      .min(8, 'La contraseña debe de tener un mínimo 8 caracteres'),
  }),
});

export { signUp, signIn };
