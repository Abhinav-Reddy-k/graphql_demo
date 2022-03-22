import debug from "debug";
import mongoose from "mongoose";
import config from "config";

const log = debug("app:db");

export default function () {
  const db = config.get("db");
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => log("Connected to MongoDB..."));
}
