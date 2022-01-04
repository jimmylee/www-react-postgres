import * as Env from "@data/environment";
import * as Server from "@common/server";
import * as Strings from "@common/strings";
import * as AuthUtilities from "@common/utilities-authentication";
import * as Data from "@data/node-data";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

export default async function signIn(req, res) {
  await Server.cors(req, res);

  if (Strings.isEmpty(req.body.email)) {
    return res
      .status(500)
      .send({ error: "An e-mail address was not provided." });
  }

  if (Strings.isEmpty(req.body.password)) {
    return res.status(500).send({ error: "A password was not provided." });
  }

  let user = await Data.getUserByEmail({ email: req.body.email });

  if (!user) {
    const salt = BCrypt.genSaltSync(Env.PASSWORD_ROUNDS);
    const hash = BCrypt.hashSync(req.body.password, salt);
    const password = BCrypt.hashSync(hash, Env.SERVICE_PASSWORD_SALT);

    user = await Data.createUser({
      email: req.body.email,
      password,
      salt,
      data: { verified: false },
    });
  } else {
    if (user.error) {
      return res
        .status(500)
        .send({ error: "We could not authenticate you (1)." });
    }

    const hash = BCrypt.hashSync(req.body.password, user.salt);
    const password = BCrypt.hashSync(hash, Env.SERVICE_PASSWORD_SALT);

    if (password !== user.password) {
      return res
        .status(500)
        .send({ error: "We could not authenticate you (2)." });
    }
  }

  const authorization = AuthUtilities.parseAuthHeader(
    req.headers.authorization
  );

  if (authorization && !Strings.isEmpty(authorization.value)) {
    const verfied = JWT.verify(authorization.value, Env.JWT_SECRET);

    if (user.email === verfied.email) {
      return res.status(200).send({
        message: "You are already authenticated. Welcome back!",
        success: true,
        viewer: user,
      });
    }
  }

  const token = JWT.sign({ user: user.id, email: user.email }, Env.JWT_SECRET);

  return res.status(200).send({ token, success: true });
}
