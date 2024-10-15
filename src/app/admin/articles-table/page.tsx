import { ARTICLE_PER_PAGE } from "@/Utils/constants"
import Link from "next/link";
import { Article } from "@prisma/client";
import { ArticlesApiCall } from "@/apiCall/articleApiCall";
import Pagination from "@/components/Articles/Pagination";
import DeleteButton from "./DeleteButton";
import { prisma } from '@/Utils/db';

interface AdminArticlesTablesProps {
    searchParams: { page: string }
}


async function AdminArticlesTables({ searchParams }: AdminArticlesTablesProps) {
    const page = searchParams.page;
    const articles: Article[] = await ArticlesApiCall(page);
    const count = await prisma.article.count();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);
    return (
        <section className='h p-5'>
            <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
            <table className="">
                <thead className="lg:text-xl">
                    <tr>
                        <th className="p-1 lg:p-2">Title</th>
                        <th className="hidden lg:inline-block">Create At</th>
                        <th>Action</th>
                        <th className="hidden lg:inline-block"></th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id} className="">
                            <td className="p-3 text-gray-700">{article.title}</td>
                            <td className="hidden lg:inline-block p-3 text-gray-700">
                                {new Date(article.createAt).toDateString()}
                            </td>
                            <td className="p-3">
                                <Link
                                    href={`/admin/articles-table/edit/${article.id}`}
                                    className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                                >Edit</Link>
                                <DeleteButton articleId={article.id} />
                            </td>
                            <td className="hidden lg:inline-block p-3">
                                <Link
                                    href={`/articles/${article.id}`}
                                    className="text-white p-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition"
                                >
                                    Read more...
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pageNumber={parseInt(page)} pages={pages} routes="/admin/articles-table" />
        </section>
    )
}

export default AdminArticlesTables
