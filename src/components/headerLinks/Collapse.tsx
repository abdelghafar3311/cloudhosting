"use client";
import { useState } from 'react';
import { GrTechnology } from 'react-icons/gr';
import { MdOutlineClose } from 'react-icons/md';
import { VscListSelection } from 'react-icons/vsc';



interface CollapseProps {
  children: React.ReactNode
}

function Collapse({ children }: CollapseProps) {
  const [toggler, setToggler] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-2'>
        <span onClick={() => setToggler(true)} className='text-slate-500 text-2xl font-extrabold flex sm:flex md:hidden lg:hidden items-center transition-all hover:text-slate-400 cursor-pointer'><VscListSelection /></span>
        <h1 className='text-indigo-600 text-2xl font-extrabold flex items-center'>Cloud <GrTechnology /> Hosting</h1>
      </div>
      <ul className={`transition-all overflow-hidden fixed sm:fixed gap-2 flex flex-col lg:flex-row top-0 left-0 md:flex-row md:w-full md:h-full md:relative md:flex md:items-center text-slate-600 ${toggler ? "h-[100vh] bg-slate-800 w-[40%] p-2" : "h-[100vh] bg-slate-800 w-[0px] p-0"}`}>
        <p className="transition-all hover:text-slate-400 flex items-center gap-1 cursor-pointer lg:hidden md:hidden" onClick={() => setToggler(false)}><MdOutlineClose /></p>
        {children}
      </ul>
    </div>
  )
}

export default Collapse
