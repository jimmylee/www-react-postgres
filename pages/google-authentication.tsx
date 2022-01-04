import * as Env from "@data/environment";
import * as Data from "@data/node-data";
import * as Strings from "@common/strings";
import * as Constants from "@common/constants";
import * as React from "react";

import App from "@components/App";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const google = require("googleapis").google;
const OAuth2 = google.auth.OAuth2;

function GoogleAuthenticationPage(props) {
  React.useEffect(() => {
    if (!Strings.isEmpty(props.token)) {
      cookies.remove(Constants.SESSION_KEY);
      cookies.set(Constants.SESSION_KEY, props.token);
      return window.location.replace("/");
    }

    window.location.replace("/?error=google");
  }, []);

  return (
    <App
      title="www-react-postgres 0.1"
      description="This is a website template for an example website"
      url=""
    />
  );
}

export async function getServerSideProps(context) {
  let client = new OAuth2(
    Env.GOOGLE_CLIENT_ID,
    Env.GOOGLE_CLIENT_SECRET,
    Env.GOOGLE_REDIRECT_URIS
  );

  if (context.query.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=google",
      },
    };
  }

  // NOTE(jim): A wrapped function in a promise to get a token since I'm not sure
  // this method is async/await compatible.
  const getGoogleData = async (code: string): Promise<any> => {
    return new Promise((resolve) => {
      client.getToken(code, async (error, token) => {
        if (error) {
          resolve({ error: "Failed to get token (1)." });
        }

        return resolve({
          success: true,
          token,
        });
      });
    });
  };

  const tokenResponse = await getGoogleData(context.query.code);

  if (tokenResponse.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=google",
      },
    };
  }

  const jwt = JWT.sign(tokenResponse.token, Env.JWT_SECRET);
  client.credentials = JWT.verify(jwt, Env.JWT_SECRET);

  const people = google.people({
    version: "v1",
    auth: client,
  });

  const response = await people.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names,organizations,memberships",
  });

  const email = response.data.emailAddresses[0].value;
  const name = response.data.names[0].displayName;

  // NOTE(jim):
  // You'll want to e-mail this to the user or something
  // Or generate some other password. Do whatever you want.
  const password = BCrypt.genSaltSync(Env.PASSWORD_ROUNDS);

  let user = await Data.getUserByEmail({ email });
  if (!user) {
    const salt = BCrypt.genSaltSync(Env.PASSWORD_ROUNDS);
    const hash = await BCrypt.hashSync(password, salt);
    const nextPassword = await BCrypt.hashSync(hash, Env.SERVICE_PASSWORD_SALT);
    user = await Data.createUser({
      email,
      password: nextPassword,
      salt,
      data: { name, verified: true, google: true },
    });

    if (user.error) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=google",
        },
      };
    }

    // NOTE(jim): Because the domain comes from google.
    // If the organization doesn't exist. create it.
    const domain = Strings.getDomainFromEmail(email);
    const organization = await Data.getOrganizationByDomain({ domain });

    if (!organization) {
      const companyName = domain.split(".")[0];
      await Data.createOrganization({
        domain,
        data: {
          name: Strings.capitalizeFirstLetter(companyName),
          tier: 0,
          ids: [user.id],
          admins: [],
        },
      });
    }
  }

  if (user.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=google",
      },
    };
  }

  // NOTE(jim): If you are able to authenticate with google...
  // the user is now verified and updated.
  if (!user.data.google) {
    await Data.updateUserDataByEmail({
      email: user.email,
      data: { ...user.data, verified: true, google: true },
    });
  }

  const authToken = JWT.sign(
    { user: user.id, email: user.email },
    Env.JWT_SECRET
  );

  return {
    props: {
      token: authToken,
    },
  };
}

export default GoogleAuthenticationPage;
