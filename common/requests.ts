import * as Constants from "@common/constants";

import Cookies from "universal-cookie";

const REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const cookies = new Cookies();

const getHeaders = () => {
  const jwt = cookies.get(Constants.SESSION_KEY);

  if (jwt) {
    return {
      ...REQUEST_HEADERS,
      authorization: `Bearer ${jwt}`,
    };
  }

  return REQUEST_HEADERS;
};

export async function get(route: string, options = {}) {
  try {
    const response = await fetch(route, {
      method: "GET",
      headers: getHeaders(),
    });

    const json = await response.json();
    console.log(route, json);
    return json;
  } catch (e) {
    console.log(e);
    return {
      error: "REQUEST_FAILED",
    };
  }
}

export async function post(route: string, options = {}) {
  try {
    const response = await fetch(route, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(options),
    });

    const json = await response.json();
    console.log(route, json);
    return json;
  } catch (e) {
    console.log(e);
    return {
      error: "REQUEST_FAILED",
    };
  }
}

export async function del(route: string, options = {}) {
  try {
    const response = await fetch(route, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify(options),
    });

    const json = await response.json();
    console.log(route, json);
    return json;
  } catch (e) {
    console.log(e);
    return {
      error: "REQUEST_FAILED",
    };
  }
}
