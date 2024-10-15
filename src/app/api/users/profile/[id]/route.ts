import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import bcrypt from "bcryptjs";

import { verifyToken } from "@/Utils/verifyToken";
import { UpdateUser } from "@/Utils/dtos";
import { UpdateUserSchema } from "@/Utils/schema";
/**
 * @method DELETE
 * @route  ~/api/users/profile/:id
 * @access private
 * @description Delete User
 */

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comment: true },
    });
    if (!user) {
      return NextResponse.json({ message: "Error 404" }, { status: 404 });
    }

    const userAlready = verifyToken(request);

    if (userAlready !== null && userAlready.isAdmin) {
      const com: number[] = user?.comment.map((items) => items.id);

      await prisma.comments.deleteMany({
        where: { id: { in: com } },
      });

      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json(
        { message: "Account is deleted" },
        { status: 200 }
      );
    }

    if (userAlready !== null && userAlready.id === user.id) {
      const com: number[] = user?.comment.map((items) => items.id);

      await prisma.comments.deleteMany({
        where: { id: { in: com } },
      });

      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json(
        { message: "Account is deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user owner can delete his profile" },
      { status: 403 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route  ~/api/users/profile/:id
 * @access private
 * @description GET User
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        username: true,
        isAdmin: true,
        email: true,
        createAt: true,
      },
    });

    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });

    const getToken = verifyToken(request);

    if (getToken === null || getToken.id !== user.id) {
      return NextResponse.json(
        { message: "only user owner can delete his profile" },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route  ~/api/users/profile/:id
 * @access private
 * @description Update User
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });

    const getToken = verifyToken(request);

    if (getToken === null || getToken.id !== user.id) {
      return NextResponse.json(
        { message: "only user owner can delete his profile" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateUser;

    // schema ...
    const schema = UpdateUserSchema.safeParse(body);

    if (!schema.success) {
      return NextResponse.json(
        { message: schema.error.errors[0].message },
        { status: 400 }
      );
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);

    let hash;
    if (body.password) hash = await bcrypt.hash(body.password, salt);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: hash,
      },
    });

    const { password, ...other } = updatedUser;

    return NextResponse.json({ ...other }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "internal server error", err },
      { status: 500 }
    );
  }
}
