"use client"
import axios from "axios";
import { DOMAIN, ARTICLE_CRUDS } from "@/Utils/server_connection";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    articleId: number
}

function DeleteButton({ articleId }: DeleteButtonProps) {
    const [load, setLoad] = useState(false);
    const router = useRouter()
    async function DeleteArticle() {
        try {
            if (confirm("are you sure want to delete this article")) {
                setLoad(true)
                await axios.delete(`${DOMAIN}/${ARTICLE_CRUDS}${articleId}`);
                setLoad(false);
                router.refresh()
                toast.success("article is deleted");
            }

        } catch (err: any) {
            setLoad(false)
            toast.error(err?.response?.data.message);
            console.log(err)
        }
    }
    if (load) {
        return (
            <button className="py-1 px-2 rounded-lg bg-gray-400 text-gray-600 cursor-not-allowed animate-pulse">
                Wait...
            </button>
        )
    }
    return (
        <button onClick={DeleteArticle} className="text-white py-1 px-2 rounded-lg bg-red-600 hover:bg-red-800 transition">
            Delete
        </button>
    )
}

export default DeleteButton
