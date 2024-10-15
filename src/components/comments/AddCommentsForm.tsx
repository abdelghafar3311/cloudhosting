"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingUtils from "../loadingUtils/LoadingUtiles";
import { toast } from "react-toastify";
import { DOMAIN, COMMENTS_DOMAIN } from "@/Utils/server_connection";

interface AddCommentsFormProps {
    articleId: number;
}

function AddCommentsForm({ articleId }: AddCommentsFormProps) {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ text: "" });
    const router = useRouter()
    function SetData(name: string, val: string) {
        setForm({ ...form, [name]: val });
    }

    const SendToServer = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/${COMMENTS_DOMAIN}`, { ...form, articleId });
            setLoading(false);
            router.refresh();
            toast.success("success post comment")
            setForm({ text: "" })
        } catch (err: any) {
            toast.error(err?.response?.data.message);
            console.log(err);
            setLoading(false);
        }
        console.log(form);
    }
    return (
        <form className="mt-5 w-[80%]" onSubmit={SendToServer}>
            {loading ? <LoadingUtils /> : null}
            <input type="text" required placeholder="Add Comments ..." name="text" onChange={(e) => SetData(e.target.name, e.target.value)} value={form.text} className="w-full p-3 mb-3 rounded text-xl border border-transparent bg-gray-200 focus:shadow-md transition outline-none text-gray-900" />
            <button type="submit" className="px-5 py-2 border-none bg-blue-600 text-white text-lg rounded hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 transition">
                Comment
            </button>
        </form>
    )
}

export default AddCommentsForm