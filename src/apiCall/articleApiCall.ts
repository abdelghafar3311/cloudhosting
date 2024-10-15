import { Article } from "@prisma/client";
import { DOMAIN } from "@/Utils/server_connection";
import { SingleArticle } from "@/Utils/types";
import { notFound } from "next/navigation";
// get articles
export async function ArticlesApiCall(
  pageN: string | null
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?page=${pageN ? pageN : 1}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    notFound();
  }

  return response.json();
}

// get articles number
export async function ArticlesCountApiCall(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed Get Articles Count");
  }

  const { count } = (await response.json()) as { count: number };
  return count;
}

// search articles
export async function ArticlesSearchApiCall(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles/search?q=${searchText}`);
  if (!response.ok) {
    notFound();
  }

  return response.json();
}

// get article in single page
export async function getSingleArticle(id: string): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    notFound();
  }

  return await response.json();
}
