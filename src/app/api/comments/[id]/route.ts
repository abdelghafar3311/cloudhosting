import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";

import { updateCommentDto } from "@/Utils/dtos";
import { updateCommentSchema } from "@/Utils/schema";
/**
 * @method  DELETE
 * @route   ~/api/comments/:id
 * @description  delete comments
 * @access   private (for user|admin)
 */

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    // check user
    const user = verifyToken(request);
    // get comment
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json(
        { message: "can't remove comment,please login first" },
        { status: 401 }
      );
    }

    // check comment find or no
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    // if is admin
    if (user.isAdmin) {
      await prisma.comments.delete({
        where: { id: parseInt(params.id) },
      });

      return NextResponse.json(
        { message: "success delete,Admin" },
        { status: 200 }
      );
    }

    // in user
    // check user
    if (comment.userId !== user.id) {
      return NextResponse.json(
        { message: "sorry you not allow deleted" },
        { status: 401 }
      );
    }

    // deleted comment
    await prisma.comments.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "success delete" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method  PUT
 * @route   ~/api/comments/:id
 * @description  update comments
 * @access   private (for user)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    // user
    const user = verifyToken(request);
    // comment
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(params.id) },
    });
    // check user has toke
    if (!user) {
      return NextResponse.json(
        { message: "please login first or create account" },
        { status: 401 }
      );
    }
    // check comment find
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    // check user has this comment
    if (user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you not allow update this comment" },
        { status: 401 }
      );
    }

    // get body
    const body = (await request.json()) as updateCommentDto;

    // schema checked
    const schema = updateCommentSchema.safeParse(body);
    if (!schema.success)
      return NextResponse.json(
        { message: schema.error.errors[0].message },
        { status: 400 }
      );

    const updateComment = await prisma.comments.update({
      where: { id: parseInt(params.id) },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updateComment, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
