"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
function SearchArticles() {
    const router = useRouter();
    const [form, setForm] = useState({ search: "" });
    function SetData(name: string, val: string) {
        setForm({ ...form, [name]: val });
    }

    const SendToServer = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/articles/SearchArticlePage?q=${form.search}`);
        console.log(form);
    }
    return (
        <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={SendToServer}>
            <input type="search" placeholder="Search" name="search" onChange={(e) => SetData(e.target.name, e.target.value)} value={form.search} className="w-full p-3 rounded text-xl border border-transparent bg-gray-200 focus:border-blue-600 transition outline-none text-gray-900" />
        </form>
    )
}

export default SearchArticles