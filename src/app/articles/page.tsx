import ArticlesItems from '@/components/Articles/ArticlesItems';
import React from 'react'
import { Article } from '@prisma/client';
import SearchArticles from '@/components/Articles/SearchArticles';
import Pagination from '@/components/Articles/Pagination';
import { ArticlesApiCall } from '@/apiCall/articleApiCall';
import { ARTICLE_PER_PAGE } from '@/Utils/constants';
import { prisma } from '@/Utils/db';

interface ArticlesProps {
  searchParams: { page: string }
}

async function Articles({ searchParams }: ArticlesProps) {
  const page = searchParams.page;
  const ArticlesFetch: Article[] = await ArticlesApiCall(page);
  const count = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);



  return (
    <div className='min-h-[84vh] container m-auto'>
      <SearchArticles />
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4 p-2'>
        {ArticlesFetch.map(items => {
          return (
            <ArticlesItems articles={items} keys={items.id} key={items.id} />
          )
        })}
      </div>
      <Pagination pageNumber={parseInt(page)} pages={pages} routes='/articles' />
    </div>
  )
}

export default Articles
