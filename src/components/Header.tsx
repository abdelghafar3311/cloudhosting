import Link from "next/link"
import { cookies } from 'next/headers';
import { verifyTokenForPages } from '@/Utils/verifyToken';
import LinksMainOfHeader from './headerLinks/Links';
import LogOurAuth from './headerLinks/LogoutAuth';
import Collapse from './headerLinks/Collapse';



function Header() {

  const token = cookies().get("token")?.value || "";

  const verify = verifyTokenForPages(token);

  return (
    <div className='bg-slate-800 flex justify-between items-center text-white px-2 py-5 border-b-4 border-b-slate-950'>
      <Collapse>
        <LinksMainOfHeader />
      </Collapse>
      <div className='flex items-center gap-2 text-slate-600'>
        {verify ? (
          <>
            <strong className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover">
              {verify.username}
            </strong>
            <LogOurAuth />
          </>
        ) : (<>
          <Link href="/register" className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover">Register</Link>
          <Link href="/login" className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover">Login</Link>
        </>)}
      </div>
    </div>
  )
}

export default Header;

/**

lg:flex md:flex sm:hidden hidden lg:items-center lg:gap-2 text-slate-600 ${toggler? "flex" : "sm:hidden hidden"}
-> flex fixed top-0 left-0 flex-col gap-2 h-[100vh] bg-slate-800 w-[20%] p-2

 * **/
