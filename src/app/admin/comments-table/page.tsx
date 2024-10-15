import { getAllComments } from "@/apiCall/adminApiCall";
import { DOMAIN, COMMENTS_DOMAIN } from "@/Utils/server_connection";
import { Comments } from "@prisma/client"
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DeleteCommentButton from "./DeleteCommentsButton";

async function AdminCommentsTables() {
    const token = cookies().get("token")?.value || undefined;
    if (!token) notFound();
    const comments: Comments[] = await getAllComments(token);
    return (
        <section className='h p-5'>
            <h2 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h2>
            <table className="table w-full text-left">
                <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
                    <tr>
                        <th className="p-2">Comment</th>
                        <th className="hidden lg:inline">Create At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.id} className="border-t border-b border-gray-300">
                            <td className="p-3 text-blue-700">{comment.text}</td>
                            <td className="hidden lg:inline-block p-3 text-gray-700">{new Date(comment.createAt).toDateString()}</td>
                            <td className="p-3">
                                <DeleteCommentButton commentId={comment.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default AdminCommentsTables