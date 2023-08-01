import express from "express";
const server = express();
import { connect } from "./config/database-config.js";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphqlServer from "./config/graphql-config.mjs";
import { PORT } from "./config/server-config.js";
import cors from "cors";
import user from "./models/user.js";
import userService from "./services/userService.js";
const userServiceobj = new userService();

server.use(express.json());
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const createAndstartServer = async () => {
  server.use(
    "/graphql",
    expressMiddleware(await createGraphqlServer(), {
      context: async ({ req, res }) => {
        const token = req.headers["token"] || "";
        try {
          const user = await userServiceobj.isAuthenticated(token);
          console.log("user is " + user);
          return { user };
        } catch (error) {
          return { user: null };
        }
      },
    })
  );

  server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
  });
  await connect();
};
createAndstartServer();
