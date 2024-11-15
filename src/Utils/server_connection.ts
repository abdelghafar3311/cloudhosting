const PRODUCTION_DOMAIN = "https://cloudhosting-3p4u.vercel.app";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN = DEVELOPMENT_DOMAIN;

// USERS AUTHENTICATE

export const LOGIN_DOMAIN = "api/users/login";

export const REGISTER_DOMAIN = "api/users/register";

export const LOGOUT_DOMAIN = "api/users/logout";

export const PROFILE_DOMAIN = "api/users/profile/"; /** it take @id */

// COMMENTS

export const COMMENTS_DOMAIN = "api/comments";

export const COMMENTS_CURD_DOMAIN =
  "api/comments/"; /** it take @id using in @DELETE and @PUT */

/** @articles links */

export const ARTICLE_CRUDS = "api/articles/"; /** take @id */

export const ARTICLE_GP = "api/articles"; /** for @GET or @POST */
