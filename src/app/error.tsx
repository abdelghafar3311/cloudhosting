
"use client"
import { RxReload } from "react-icons/rx";
import Link from "next/link";
interface ErrorPageProps {
  error: Error
  reset: () => void
}

function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="h-[100vh] flex flex-col gap-5 pt-3 items-center">
      <h1 className="text-lg text-gray-600 ">Some Thing Error</h1>
      <h3 className="text-3xl font-extrabold">Error Typing</h3>
      <p className="text-gray-600 text-sm">{error.message}</p>
      <div className="flex gap-3 items-center">
        <button className="flex items-center gap-1 w-full h-[35px] mt-3 rounded-2xl justify-center px-3  bg-cyan-600 text-white font-bold transition-all hover:bg-cyan-500" onClick={() => reset()}><RxReload /> Reload</button>
        <Link href='/' className="w-full h-[35px] mt-3 rounded-2xl flex justify-center px-3 items-center bg-indigo-600 text-white font-bold transition-all hover:bg-indigo-500">Go Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage
