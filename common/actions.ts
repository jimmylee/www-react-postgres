import * as Requests from "@common/requests";
import * as Constants from "@common/constants";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const signIn = async (key: string, body: any) => {
  cookies.remove(Constants.SESSION_KEY);
  let response = await Requests.post("/api/sign-in", body);
  if (response.success) {
    if (response.token) {
      cookies.set(Constants.SESSION_KEY, response.token);
    }

    return window.location.reload();
  }

  return alert(response.error);
};

const signOut = async (key: string) => {
  const jwt = cookies.get(Constants.SESSION_KEY);
  if (jwt) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  }

  return alert("There was no session to sign out of.");
};

const deleteViewer = async (key: string) => {
  let response = await Requests.del("/api/viewer/delete");
  if (response.success) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  }

  return alert(response.error);
};

const connectMetamask = async (key: string) => {
  if (!window.ethereum) {
    alert("Metamask is not installed");
  }

  // NOTE(jim): Returns an array of ethereum addresses.
  const response = await ethereum.request({ method: "eth_requestAccounts" });
  console.log(response);

  if (response && response.length) {
    for await (const address of response) {
      await Requests.post("/api/ethereum/create", { address });
    }
  }

  return window.location.reload();
};

export const execute = async (key: string, body?: any) => {
  if (key === "SIGN_IN") return await signIn(key, body);
  if (key === "SIGN_OUT") return await signOut(key);
  if (key === "VIEWER_DELETE_USER") return await deleteViewer(key);
  if (key === "VIEWER_CONNECT_METAMASK") return await connectMetamask(key);

  return alert(`There is no action: ${key}`);
};
