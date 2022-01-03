import * as Env from "@data/environment";

const google = require("googleapis").google;
const OAuth2 = google.auth.OAuth2;

export const generateURL = async () => {
  const client = new OAuth2(
    Env.GOOGLE_CLIENT_ID,
    Env.GOOGLE_CLIENT_SECRET,
    Env.GOOGLE_REDIRECT_URIS
  );

  const googleURL = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/user.organization.read",
    ],
    prompt: "consent",
  });

  return { googleURL };
};
