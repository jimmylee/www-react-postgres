import * as Env from "@data/environment";
import * as Server from "@common/server";

// NOTE(jim):
// CORS API example.
export default async function apiIndex(req, res) {
  await Server.cors(req, res);

  res.json({ success: true });
}
