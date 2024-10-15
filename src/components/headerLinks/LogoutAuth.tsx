"use client"
import { useState } from "react"
import axios from "axios";
import LoadingUtils from "../loadingUtils/LoadingUtiles";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoReloadOutline } from "react-icons/io5";

import { DOMAIN, LOGOUT_DOMAIN } from "@/Utils/server_connection";

function LogOutAuth() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    async function logout() {
        try {
            setLoading(true)
            const log = await axios.get(`${DOMAIN}/${LOGOUT_DOMAIN}`);
            setLoading(false);
            toast.success("success logout")
            router.replace("/");
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data.message)
        }
    }




    return (
        <>
            <button onClick={logout} className="transition-all border-0 outline-none hover:text-slate-400 flex items-center gap-1 TogglerHover">
                Logout
            </button>
            <button onClick={() => router.refresh()} className="transition-all border-0 outline-none hover:text-slate-400 flex items-center gap-1">
                <IoReloadOutline />
            </button>

            {loading ? <LoadingUtils /> : null}
        </>
    )
}

export default LogOutAuth
