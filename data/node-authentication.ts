import * as Env from "@data/environment";
import * as NodeData from "@data/node-data";
import * as Strings from "@common/strings";
import * as Utilities from "@common/utilities";
import * as AuthUtilities from "@common/utilities-authentication";

import JWT, { decode } from "jsonwebtoken";

export const getViewer = async (req, existingToken = undefined) => {
  let viewer = null;

  try {
    let token = existingToken;
    if (!token) {
      token = AuthUtilities.getToken(req);
    }

    let decode = JWT.verify(token, Env.JWT_SECRET);
    viewer = await NodeData.getUserByEmail({ email: decode.email });
  } catch (e) {
    viewer = null;
  }

  if (!viewer || viewer.error) {
    viewer = null;
  }

  return { viewer };
};
