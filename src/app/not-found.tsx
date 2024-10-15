import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className='h flex justify-center items-center flex-col gap-10'>
      <div className='flex items-center gap-3'><div className='flex items-center h-[100px] text-red-600'><h1 className='text-[120px] font-extrabold'>404</h1> <span className='w-[1px] h-[80px] bg-slate-900 rounded-xl'></span></div>  <p className='text-sm'>The page is not found</p> </div>
      <Link href='/' className='px-7 py-1 rounded-xl bg-cyan-600 text-white font-bold transition-all hover:bg-cyan-500'>Go Home</Link>
    </div>
  )
}

export default NotFound
