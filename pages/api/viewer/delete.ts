import * as Env from "@data/environment";
import * as Data from "@data/node-data";
import * as Strings from "@common/strings";
import * as AuthUtilities from "@common/utilities-authentication";

import JWT from "jsonwebtoken";

export default async function deleteViewer(req, res) {
  const authorization = AuthUtilities.parseAuthHeader(
    req.headers.authorization
  );

  if (!authorization) {
    return res.status(500).send({ error: "viewer/delete error (1)" });
  }

  const v = JWT.verify(authorization.value, Env.JWT_SECRET);

  if (!v || !v.email) {
    return res.status(500).send({ error: "viewer/delete error (2)" });
  }

  const user = await Data.getUserByEmail({ email: v.email });

  if (!user) {
    return res.status(500).send({ error: "viewer/delete error (3)" });
  }

  const organization = await Data.getOrganizationByUserId({ id: user.id });

  if (
    organization &&
    organization.data &&
    organization.data.ids &&
    organization.data.ids.length === 1
  ) {
    const co = await Data.deleteUserFromOrganizationByUserId({
      organizationId: organization.id,
      userId: user.id,
    });

    if (!co) {
      return res.status(500).send({ error: "viewer/delete error (4)" });
    }
  }

  const d = await Data.deleteUserById({ id: user.id });
  if (!d) {
    return res.status(500).send({ error: "viewer/delete error (5)" });
  }

  return res.status(200).send({ success: true });
}
