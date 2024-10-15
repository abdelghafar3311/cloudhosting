export interface CreateArticleDto {
  title: string;
  description: string;
}

export interface UpdateArticleDto {
  title?: string;
  description?: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreateCommentDto {
  text: string;
  articleId: number;
}

export interface updateCommentDto {
  text: string;
}
