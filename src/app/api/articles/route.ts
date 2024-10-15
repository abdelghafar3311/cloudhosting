import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/Utils/verifyToken";

import { createArticleSchema } from "@/Utils/schema";
import { CreateArticleDto } from "@/Utils/dtos";
import { prisma } from "@/Utils/db";
import { Article } from "@prisma/client";
import { ARTICLE_PER_PAGE } from "@/Utils/constants";
/**
 * @method GET
 * @route ~/api/articles
 * @description Get All Articles
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page");
    const p = page ? ARTICLE_PER_PAGE * (parseInt(page) - 1) : 0;
    const articles = await prisma.article.findMany({
      skip: p,
      take: ARTICLE_PER_PAGE,
      orderBy: { createAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Internal Server Error` },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create Article
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    const body = (await request.json()) as CreateArticleDto;
    const statusVal = createArticleSchema.safeParse(body);

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "sorry only admin can create article" },
        { status: 403 }
      );
    }

    if (!statusVal.success) {
      return NextResponse.json(
        { message: statusVal.error.errors[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: `Internal Server Error` },
      { status: 500 }
    );
  }
}
