import React from 'react'
import { Article } from '@prisma/client';
import { ArticlesSearchApiCall } from '@/apiCall/articleApiCall';
import ArticlesItems from '@/components/Articles/ArticlesItems';

interface SearchProps {
    searchParams: { q: string }
}

async function SearchArticlePage({ searchParams: { q } }: SearchProps) {
    const articles: Article[] = await ArticlesSearchApiCall(q);
    return (
        <section className='h container m-auto px-5'>
            {articles.length <= 0 ? (
                <h1 className='text-2xl font-bold'>
                    Search in: <span className='text-3xl text-red-500 font-bold ms-1'>{q}</span> is not found
                </h1>
            ) : (
                <>
                    <h1 className='text-2xl font-bold'>
                        Search in: <span className='text-3xl font-bold ms-1 text-green-700'>{q}</span>
                    </h1>
                    <div className='grid justify-center items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4 p-2'>
                        {articles.map(item => {
                            return (
                                <ArticlesItems articles={item} keys={item.id} key={item.id} />
                            )
                        })}
                    </div>
                </>
            )}

        </section>
    )
}

export default SearchArticlePage
