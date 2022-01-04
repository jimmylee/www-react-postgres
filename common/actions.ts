import * as Requests from "@common/requests";
import * as Constants from "@common/constants";
import * as Strings from "@common/strings";

import Cookies from "universal-cookie";

const cookies = new Cookies();

declare const window: any;

const signIn = async (body: any) => {
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

const signOut = async () => {
  const jwt = cookies.get(Constants.SESSION_KEY);
  if (jwt) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  }

  return alert("There was no session to sign out of.");
};

const deleteViewer = async () => {
  let response = await Requests.del("/api/viewer/delete");
  if (response.success) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  }

  return alert(response.error);
};

const connectMetamask = async () => {
  if (!window.ethereum) {
    alert("Metamask is not installed");
  }

  // NOTE(jim): Returns an array of ethereum addresses.
  const response = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // NOTE(jim): Add a database record to associate centralized data to an address.
  if (response && response.length) {
    for await (const address of response) {
      await Requests.post("/api/ethereum/create", { address });
    }
  }

  return window.location.reload();
};

const connectPhantom = async () => {
  let address = null;
  try {
    const response = await window.solana.connect();
    address = response.publicKey.toString();
  } catch (e) {
    console.log(e);
  }

  // NOTE(jim): Add a database record to associate centralized data to an address.
  if (!Strings.isEmpty(address)) {
    await Requests.post("/api/solana/create", { address });
  }

  return window.location.reload();
};

export const execute = async (key: string, body?: any) => {
  if (key === "SIGN_IN") return await signIn(body);
  if (key === "SIGN_OUT") return await signOut();
  if (key === "VIEWER_DELETE_USER") return await deleteViewer();
  if (key === "VIEWER_CONNECT_METAMASK") return await connectMetamask();
  if (key === "VIEWER_CONNECT_PHANTOM") return await connectPhantom();

  return alert(`There is no action: ${key}`);
};
