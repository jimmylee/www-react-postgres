import * as Env from "@data/environment";
import * as Solana from "@data/node-solana";
import * as Server from "@common/server";
import * as Strings from "@common/strings";

export default async function createSolanaAddress(req, res) {
  await Server.cors(req, res);

  if (Strings.isEmpty(req.body.address)) {
    return res
      .status(500)
      .send({ error: "A Solana address must be provided." });
  }

  const response = await Solana.createAddress({ address: req.body.address });

  res.json({ address: response });
}
