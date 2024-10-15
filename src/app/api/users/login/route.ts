import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";
import bcrypt from "bcryptjs";

import { LoginUserDto } from "@/Utils/dtos";
import { loginSchema } from "@/Utils/schema";
import { setCookie } from "@/Utils/generateJWT";

/**
 * @method  POST
 * @route   ~/api/users/login
 * @description  login user
 * @access   public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;

    const schema = loginSchema.safeParse(body);
    if (!schema.success) {
      return NextResponse.json(
        { message: schema.error.errors[0].message },
        { status: 400 }
      );
    }

    // check if user found
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json(
        {
          message: "the email or password is wrong",
        },
        { status: 400 }
      );
    }
    // compare password
    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      return NextResponse.json(
        { message: "the email or password is wrong" },
        { status: 400 }
      );
    }
    // create token and save in cookie
    const cookie = setCookie({
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    NextResponse.json({ message: "Interval Server Error" }, { status: 500 });
  }
}
