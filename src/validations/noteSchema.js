import { z } from 'zod';

const note = z.object({
  body: z.object({
    title: z.string().nonempty('El titulo es un campo requerido'),
    content: z.string().nonempty('La nota es un campo requerido'),
  }),
});

const noteParm = z.object({
  params: z.object({
    id: z.string().nonempty('Es requerido un parámetro en la url'),
  }),
});

export { note, noteParm };
