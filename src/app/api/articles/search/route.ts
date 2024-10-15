import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";

/**
 * @method GET
 * @route ~/api/articles/search?q
 * @description search articles
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");
    let articles;
    if (q) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            startsWith: q,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Internal Server Error` },
      { status: 500 }
    );
  }
}
