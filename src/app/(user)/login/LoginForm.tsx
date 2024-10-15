"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

import LoadingUtils from "@/components/loadingUtils/LoadingUtiles";
import { DOMAIN, LOGIN_DOMAIN } from "@/Utils/server_connection";

function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    function SetData(name: string, val: string) {
        setForm({ ...form, [name]: val });
    }

    const SendToServer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const postData = await axios.post(`${DOMAIN}/${LOGIN_DOMAIN}`, form);
            setLoading(false);
            toast.success("Success Login");
            router.replace('/');
            router.refresh();
        } catch (err: any) {
            setLoading(false);
            toast.error(err?.response?.data.message);
            console.log(err)
        }
    }
    return (
        <form className="flex flex-col relative" onSubmit={SendToServer}>
            <input type="email" required placeholder="Enter Your Email" name="email" onChange={(e) => SetData(e.target.name, e.target.value)} value={form.email} className="mb-4 block border rounded p-2 text-xl" />
            <input type="password" required placeholder="Enter Your Password" name="password" onChange={(e) => SetData(e.target.name, e.target.value)} value={form.password} className="mb-4 block border rounded p-2 text-xl" />
            <button type="submit" className="text-2xl text-white border-none bg-blue-800 p-2 rounded-lg font-bold">
                Log In
            </button>

            {loading ? <LoadingUtils /> : null}

        </form>
    )
}

export default LoginForm
