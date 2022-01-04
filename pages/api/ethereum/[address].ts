import * as Env from "@data/environment";
import * as Ethereum from "@data/node-ethereum";
import * as Server from "@common/server";
import * as Strings from "@common/strings";

export default async function apiIndex(req, res) {
  await Server.cors(req, res);

  const { address } = req.query;

  if (Strings.isEmpty(address)) {
    res.json({ error: "There is no address to look up locally." });
  }

  const response = await Ethereum.getAddress({ address });

  res.json({ ...response });
}
