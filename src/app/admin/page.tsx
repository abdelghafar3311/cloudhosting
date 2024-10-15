import ArticleForm from "./AddArticleForm"

function Admin() {
  return (
    <div className="h flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-slate-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <ArticleForm />
      </div>

    </div>
  )
}

export default Admin