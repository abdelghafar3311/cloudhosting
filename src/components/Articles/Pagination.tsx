const pages = [1, 2, 3, 4]
import Link from "next/link";


interface PaginationProps {
    pages: number
    pageNumber: number
    routes: string
}

function Pagination({ pages, pageNumber, routes }: PaginationProps) {
    let pagesArray: number[] = [];
    for (let i = 1; i <= pages; i++) pagesArray.push(i); // 20 1,2,3 ..20 stopped

    const prev = pageNumber > 1 ? pageNumber - 1 : pageNumber
    const next = pageNumber < pages ? pageNumber + 1 : pageNumber // 4 = 3 4

    return (
        <div className='flex justify-center items-center mt-2 mb-10'>
            {pageNumber <= 1 ? null : (
                <Link href={`${routes}?page=${prev}`} className="border border-t-gray-500 border-gray-700 text-gray-700 py-1 px-1 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
                    Prev
                </Link>
            )}

            {
                pagesArray.map(page => (
                    <Link href={`${routes}?page=${page}`} className={`${page === pageNumber ? "bg-gray-400" : ""} border border-t-gray-500 border-gray-700 py-1 px-1 min-w-8 flex justify-center items-center font-bold text-xl cursor-pointer hover:bg-gray-200 transition`} key={page}>
                        {page}
                    </Link>
                ))
            }
            {pageNumber >= pages ? null : (
                <Link href={`${routes}?page=${next}`} className="border border-t-gray-500 border-gray-700 text-gray-700 py-1 px-1 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
                    next
                </Link>
            )}

        </div>
    )
}

export default Pagination
