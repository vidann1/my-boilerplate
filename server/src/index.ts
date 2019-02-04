import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connnectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      // https://19majkel94.github.io/type-graphql/docs/authorization.html
      // here you can read user from context
      // and check his permission in db against `roles` argument
      // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
      if (req.session.userId) {
        return true;
      }
      return false;
      // or
      // return !!req.session.userId
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();
  const RedisStore = connnectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "qgqefgws1aa4235",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    } as any)
  );

  apolloServer.applyMiddleware({ app });

  const PORT = "4000";

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
};

main();
