import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import bcrypt from "bcryptjs";

import { RegisterUserDto } from "@/Utils/dtos";
import { registerSchema } from "@/Utils/schema";
import { setCookie } from "@/Utils/generateJWT";
/**
 * @method POST
 * @route  ~/api/users/register
 * @description create new user
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    // check request is right or no
    const schema = registerSchema.safeParse(body);
    if (!schema.success) {
      return NextResponse.json(
        { message: schema.error.errors[0].message },
        { status: 400 }
      );
    }
    // check user is exists or no
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "!the user is already exists" },
        { status: 400 }
      );
    }

    // hash password before save
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hash,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });
    // create token and save in cookie in client
    const cookie = setCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    });

    return NextResponse.json(
      {
        message: "success create new user",
        newUser,
      },
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (err) {
    NextResponse.json({ message: "Interval Server Error" });
  }
}
