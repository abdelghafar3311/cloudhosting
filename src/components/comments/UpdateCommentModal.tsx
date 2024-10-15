"use client"
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LoadingUtils from "../loadingUtils/LoadingUtiles";
import { DOMAIN, COMMENTS_CURD_DOMAIN } from "@/Utils/server_connection";
interface UpdateCommentModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>
    text: string
    commentId: number
}

function UpdateCommentModal({ setOpen, text, commentId }: UpdateCommentModalProps) {
    const [t, setT] = useState(text);
    const [load, setLoad] = useState(false)
    const router = useRouter()
    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoad(true);
            await axios.put(`${DOMAIN}/${COMMENTS_CURD_DOMAIN}${commentId}`, { text: t });
            setLoad(false);
            setOpen(false);
            toast.success("Success Update");
            router.refresh();
        } catch (err: any) {
            setLoad(false);
            toast.error(err?.response?.data.message);
            console.log(err);
            router.refresh();
            setOpen(false);
        }
    }
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
                <div className="flex justify-end items-start mb-5">
                    <IoMdCloseCircleOutline onClick={() => setOpen(false)} className="text-3xl text-red-500 cursor-pointer" />
                </div>
                <form onSubmit={sendForm}>
                    <input
                        type="text"
                        className="text-xl rounded-lg p-2 w-full bg-white md-2"
                        placeholder="Edited Comment..."
                        value={t}
                        onChange={(e) => setT(e.target.value)}
                        required
                        min={3}
                        max={200}
                    />
                    <button className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition">Edit</button>
                </form>
            </div>
            {load && <LoadingUtils />}
        </div>
    )
}

export default UpdateCommentModal
