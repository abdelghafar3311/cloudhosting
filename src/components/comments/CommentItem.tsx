"use client"

import { CommentsWithUser } from "@/Utils/types"
import { FaEdit, FaTrash } from "react-icons/fa"
import UpdateCommentModal from "./UpdateCommentModal"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"
import axios from "axios";
import { DOMAIN, COMMENTS_CURD_DOMAIN } from "@/Utils/server_connection"
import LoadingUtils from "../loadingUtils/LoadingUtiles"
interface CommentItemProps {
  comment: CommentsWithUser
  userId: number | undefined
}

function CommentItem({ comment, userId }: CommentItemProps) {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false)
  const router = useRouter();
  const DeleteHandler = async () => {
    if (confirm("Do you want delete this comment?")) {
      try {
        setLoad(true)
        const dComment = await axios.delete(`${DOMAIN}/${COMMENTS_CURD_DOMAIN}${comment.id}`);
        setLoad(false);
        toast.success(dComment.data.message);
        router.refresh()
      } catch (err: any) {
        toast.error(err?.response?.data.message);
        console.log(err);
        setLoad(false);
        router.refresh()
      }
    }
  }
  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300 w-[80%]">
      {load && <LoadingUtils />}
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2">
        {comment.text}
      </p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit onClick={() => setOpen(true)} className="text-green-600 text-xl cursor-pointer me-3" />
          <FaTrash onClick={DeleteHandler} className="text-red-600 text-xl cursor-pointer" />
        </div>
      )}

      {open && <UpdateCommentModal setOpen={setOpen} text={comment.text} commentId={comment.id} />}
    </div>
  )
}

export default CommentItem
