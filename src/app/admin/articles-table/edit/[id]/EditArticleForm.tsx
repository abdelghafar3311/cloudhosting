"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingUtils from "@/components/loadingUtils/LoadingUtiles";
import { DOMAIN, ARTICLE_CRUDS } from "@/Utils/server_connection";
import { Article } from "@prisma/client";

interface EditArticleFormProps {
    article: Article
}

function EditArticleForm({ article }: EditArticleFormProps) {
    const [form, setForm] = useState({ title: article.title, description: article.description });
    const [load, setLoad] = useState(false);
    const router = useRouter();
    function SetData(name: string, val: string) {
        setForm({ ...form, [name]: val });
    }

    const SendToServer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoad(true);
            const art = await axios.put(`${DOMAIN}/${ARTICLE_CRUDS}${article.id}`, form);
            setLoad(false);
            router.refresh();
            toast.success("success Edit article");
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
                Edit Article
            </button>
        </form>
    )
}

export default EditArticleForm
