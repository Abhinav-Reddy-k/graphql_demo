import express from "express";
import { graphqlHTTP } from "express-graphql";
import db from "./startup/db.js";
import schema from "./schema/schema.js";

const app = express();
db(app);

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
