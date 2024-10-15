import { COMMENTS_DOMAIN, DOMAIN } from "@/Utils/server_connection";
import { Comments } from "@prisma/client";
/** get all @comments for @admin position */
export async function getAllComments(token: string): Promise<Comments[]> {
  const response = await fetch(`${DOMAIN}/${COMMENTS_DOMAIN}`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Felid Request");
  }
  return await response.json();
}
