import { ReactNode } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className='text-red-700 text-sm flex flex-row gap-1 items-center' role='alert'>
      <RiErrorWarningLine /> {children}
    </div>
  )
}
