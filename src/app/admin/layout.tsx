
import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/Utils/verifyToken";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Cloud Hosting",
    description: "Admin Dashboard",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const tokenClient = cookies().get("token")?.value;
    if (!tokenClient) redirect("/")
    const userToken = verifyTokenForPages(tokenClient)
    if (!userToken?.isAdmin) notFound();
    return (
        <div className="h flex items-start">
            <div className="min-h-[86vh] flex-[1] lg:flex-[2] md:flex-[2] sm:flex-[2] bg-slate-700 text-slate-100 p-2">
                <AdminSidebar />
            </div>
            <div className="max-h-[86vh] p-5 flex-[9] lg:flex-[8] md:flex-[8] sm:flex-[8] overflow-hidden overflow-y-auto">
                {children}
            </div>

        </div>
    );
}
