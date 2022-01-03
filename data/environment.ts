if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URIS = process.env.GOOGLE_REDIRECT_URIS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PASSWORD_ROUNDS = parseInt(process.env.PASSWORD_ROUNDS);
export const SERVICE_PASSWORD_SALT = process.env.SERVICE_PASSWORD_SALT;
