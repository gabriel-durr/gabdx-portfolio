import { ReactNode } from 'react'

export default function PostLayout({ children }: Record<'children', ReactNode>) {
  return <section>{children}</section>
}
