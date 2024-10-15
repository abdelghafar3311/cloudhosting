import Link from "next/link";

import { cookies } from 'next/headers';
import { verifyTokenForPages } from '@/Utils/verifyToken';

function LinksMainOfHeader() {

    const token = cookies().get("token")?.value || "";

    const verify = verifyTokenForPages(token);

    return (
        <>
            <Link href="/" className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover">Home</Link>
            <Link href="/about" className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover"> About</Link>
            {verify?.isAdmin ? (<Link href="/admin" className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover"> Admin Dashboard</Link>) : null}
            <Link href="/articles?page=1" className="transition-all hover:text-slate-400 flex items-center gap-1 TogglerHover">Articles</Link>
        </>
    )
}

export default LinksMainOfHeader
