"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingUtils from "@/components/loadingUtils/LoadingUtiles";
import { DOMAIN, ARTICLE_GP } from "@/Utils/server_connection";
function ArticleForm() {
    const [form, setForm] = useState({ title: "", description: "" });
    const [load, setLoad] = useState(false);
    const router = useRouter();
    function SetData(name: string, val: string) {
        setForm({ ...form, [name]: val });
    }

    const SendToServer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoad(true);
            const art = await axios.post(`${DOMAIN}/${ARTICLE_GP}`, form);
            setLoad(false);
            router.refresh();
            toast.success("success add article");
            setForm({ title: "", description: "" })
        } catch (err: any) {
            toast.error(err?.response?.data.message);
            setLoad(false);
            console.log(err)
        }
    }
    return (
        <form className="flex flex-col" onSubmit={SendToServer}>
            {load && <LoadingUtils />}
            <input type="text" required placeholder="Enter Your Title" name="title" onChange={(e) => SetData(e.target.name, e.target.value)} value={form.title} className="mb-4 block border rounded p-2 text-xl" />
            <textarea required rows={5} placeholder="Description" name="description" onChange={(e) => SetData(e.target.name, e.target.value)} value={form.description} className="mb-4 block border rounded p-2 text-xl" ></textarea>
            <button type="submit" className="text-2xl text-white border-none bg-blue-800 hover:bg-blue-700 transition p-2 rounded-lg font-bold">
                Create Article
            </button>
        </form>
    )
}

export default ArticleForm