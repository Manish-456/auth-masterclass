import React from 'react'
import { Navbar } from './_components/navbar'

interface IProtectedLayoutProps {
 children: React.ReactNode
}

export default function ProtectedLayout({
    children
}: IProtectedLayoutProps) {
  return (
    <div className='h-full w-full flex items-center justify-center flex-col gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
        <Navbar />
      {children}
    </div>
  )
}
