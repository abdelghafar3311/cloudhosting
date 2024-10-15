import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
/**
 * @method GET
 * @description  logout from account - Delete Cookie from client
 * @access public
 * @route  ~/api/users/logout
 */

export async function GET(request: NextRequest) {
  try {
    cookies().delete("token");
    return NextResponse.json({ message: "logout" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "interval server error" },
      { status: 500 }
    );
  }
}
