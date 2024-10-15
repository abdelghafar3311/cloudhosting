import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/Utils/db";

/**
 * @method GET
 * @route ~/api/articles/count
 * @description get count of articles
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Internal Server Error` },
      { status: 500 }
    );
  }
}
