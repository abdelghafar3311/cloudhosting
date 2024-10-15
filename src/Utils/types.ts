import { Article, Comments, User } from "@prisma/client";

export type PayloadVal = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type CommentsWithUser = Comments & { user: User };

export type SingleArticle = Article & { comments: CommentsWithUser[] };
