import { ReactNode } from "react";

export default function ErrorMessageForm({ children }: { children: ReactNode }) {
  return (
    <div className='bg-red-600 text-white text-center text-sm font-semibold uppercase p-3 rounded w-full' role='alert'>
      {children}
    </div>
  )
}
  