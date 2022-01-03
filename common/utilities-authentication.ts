import * as Constants from "@common/constants";
import * as Strings from "@common/strings";

export const getToken = (req) => {
  if (Strings.isEmpty(req.headers.cookie)) {
    return null;
  }

  return req.headers.cookie.replace(Constants.SESSION_KEY_REGEX, "$1");
};

export const parseAuthHeader = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  var matches = value.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};
