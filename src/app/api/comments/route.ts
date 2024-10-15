import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";

import { CreateCommentDto } from "@/Utils/dtos";
import { createCommentSchema } from "@/Utils/schema";
/**
 * @method  POST
 * @route   ~/api/comments
 * @description  post comments
 * @access   private
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user)
      return NextResponse.json(
        { message: "only logged in user,access denied" },
        { status: 401 }
      );

    const body = (await request.json()) as CreateCommentDto;

    const schema = createCommentSchema.safeParse(body);

    if (!schema.success) {
      return NextResponse.json(
        { message: schema.error.errors[0].message },
        { status: 400 }
      );
    }

    // check article id
    const artId = await prisma.article.findUnique({
      where: { id: body.articleId },
    });

    if (!artId) {
      return NextResponse.json(
        { message: "this article not found" },
        { status: 404 }
      );
    }

    const newComment = await prisma.comments.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method  GET
 * @route   ~/api/comments
 * @description  get comments
 * @access   private (only admin)
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user)
      return NextResponse.json(
        { message: "only logged in user,access denied" },
        { status: 401 }
      );
    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "only Admin can get comments" },
        { status: 401 }
      );
    }

    const comments = await prisma.comments.findMany({
      orderBy: { createAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
