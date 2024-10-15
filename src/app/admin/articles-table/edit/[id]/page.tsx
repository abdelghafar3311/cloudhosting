import { getSingleArticle } from "@/apiCall/articleApiCall"
import { Article } from "@prisma/client";
import EditArticleForm from "./EditArticleForm";



interface UpdateArticlesProps {
    params: { id: string }
}

async function UpdateArticles({ params: { id } }: UpdateArticlesProps) {
    const article: Article = await getSingleArticle(id);


    return (
        <section className="h flex justify-center items-center px-5 lg:px-20">
            <div className="shadow p-4 bg-slate-200 rounded w-full">
                <h2 className="text-2xl text-slate-700 font-semibold mb-4">
                    Edit Article
                </h2>
                <EditArticleForm article={article} />
            </div>
        </section>
    )
}

export default UpdateArticles
