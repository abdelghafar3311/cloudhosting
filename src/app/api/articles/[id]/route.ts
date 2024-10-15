import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { UpdateArticleDto } from "@/Utils/dtos";
import { verifyToken } from "@/Utils/verifyToken";

interface Props {
  params: { id: string };
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @access public
 * @description Get article by id
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                email: true,
                username: true,
                isAdmin: true,
                createAt: true,
              },
            },
          },
          orderBy: {
            createAt: "desc",
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "This article is not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Interval Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @access private
 * @description Update article
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "sorry only admin can create article" },
        { status: 403 }
      );
    }

    if (!article) {
      return NextResponse.json(
        { message: "This article is not found!" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as UpdateArticleDto;

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(
      { message: "Update success", data: updatedArticle },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Interval Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @access public
 * @description Delete article
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "sorry only admin can create article" },
        { status: 403 }
      );
    }

    if (!article) {
      return NextResponse.json(
        { message: "This article is not found!" },
        { status: 404 }
      );
    }

    // @todo - delete comments in this article
    const commentsId: number[] = article?.comments.map((commit) => commit.id); // get all comments
    await prisma.comments.deleteMany({
      where: { id: { in: commentsId } },
    });
    // delete article
    await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });

    const allArticle = await prisma.article.findMany();

    return NextResponse.json({ message: "DELETE success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Interval Server Error" },
      { status: 500 }
    );
  }
}
