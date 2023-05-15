import { z } from 'zod'

import { MenuNavProps } from '@/layout/header/menu-nav'

type FormDataProps = MenuNavProps['menuItems']['formData']['inputs']

const zodFormSchema = ({ inputName, inputEmail, inputMessage }: FormDataProps) =>
  z.object({
    name: z
      .string()
      .nonempty(inputName.required_msg)
      .min(4, inputName.min_msg)
      .max(50, inputName.max_msg)
      .regex(/^[A-Za-z\s]+$/, inputName.pattern_msg)
      .transform((name) =>
        name
          .trim()
          .toLowerCase()
          .replace(/\b(\w)/g, (word) => word.toUpperCase())
      ),
    email: z
      .string()
      .nonempty(inputEmail.required_msg)
      .email(inputEmail.pattern_msg)
      .max(80, inputEmail.max_msg)
      .toLowerCase(),
    textarea: z.string().nonempty(inputMessage.required_msg).max(1400, inputMessage.max_msg)
  })

export { zodFormSchema }
