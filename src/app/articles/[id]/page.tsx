import AddCommentsForm from "@/components/comments/AddCommentsForm";
import CommentItem from "@/components/comments/CommentItem";
import { getSingleArticle } from "@/apiCall/articleApiCall";
import { SingleArticle } from "@/Utils/types";

import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/Utils/verifyToken";

async function ArticlesFetchItemsOne({ params: { id } }: { params: { id: string } }) {

  const article: SingleArticle = await getSingleArticle(id);
  const token = cookies().get("token")?.value || "";
  const user = verifyTokenForPages(token);

  return (
    <div className='min-h-[100vh] flex flex-col items-center pt-2 bg-slate-400'>
      <div className='w-[80%] p-3 rounded-md bg-white'>
        <h1 className='text-3xl font-extrabold text-gray-700 mb-2'>{article.title}</h1>
        <span className="text-gray-400 text-sm mb-5">{new Date(article.createAt).toDateString()}</span>
        <p className="text-xl text-gray-800">{article.description}</p>
      </div>


      {token ? <AddCommentsForm articleId={article.id} /> : <p className="text-xl text-center text-gray-700 p-5 mt-4">Please Login or Register to can write comments</p>}
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} userId={user?.id} />
      ))}

      {article.comments.length <= 0 && (<p className="text-xl text-center text-gray-700 p-5 mt-4">No Any Comments Here</p>)}

    </div>
  )
}

export default ArticlesFetchItemsOne
