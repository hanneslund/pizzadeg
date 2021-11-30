import { NextApiRequest, NextApiResponse } from "next";

export default function log(req: NextApiRequest, res: NextApiResponse) {
  let log;
  if (req.query.level === "warning") {
    log = console.warn;
  } else if (req.query.level === "error") {
    log = console.error;
  } else {
    log = console.log;
  }
  if (req.body) {
    log(req.body);
  }
  res.send("OK");
}
