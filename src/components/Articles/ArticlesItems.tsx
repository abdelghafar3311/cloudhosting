

import React from 'react';
import { Article } from '@prisma/client';
import Link from 'next/link';
function ArticlesItems({ articles, keys }: { articles: Article, keys: number }) {
  // const date = articles.updateAt.getDate()
  return (
    <div key={keys} className='p-2 rounded-md shadow-md border border-slate-500 bg-gray-100 hover:bg-gray-200 transition'>
      <h3 className='text-xl text-slate-900 my-2 line-clamp-1'>{articles.title}</h3>
      <p className='text-slate-800 space-x-1 line-clamp-1'>
        {articles.description}
      </p>
      <Link href={`/articles/${articles.id}`} className='w-full h-[35px] mt-3 rounded-sm flex justify-center items-center bg-indigo-600 text-white font-bold transition-all hover:bg-indigo-500'>Read More</Link>
    </div>
  )
}

export default ArticlesItems
