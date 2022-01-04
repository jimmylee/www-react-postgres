import * as Env from "@data/environment";
import * as Solana from "@data/node-solana";
import * as Server from "@common/server";
import * as Strings from "@common/strings";

export default async function getSolanaAddress(req, res) {
  await Server.cors(req, res);

  const { address } = req.query;

  if (Strings.isEmpty(address)) {
    res.json({ error: "There is no solana address to look up locally." });
  }

  const response = await Solana.getAddress({ address });

  res.json({ ...response });
}
