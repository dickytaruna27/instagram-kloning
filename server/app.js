if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const authentication = require("./helpers/auth");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const { typeDefsUser, resolverUser } = require("./schemas/UserSchema");

const { connect, getDb } = require("./config/connection");
const { resolvers, typeDefs } = require("./schemas/PostSchema");
const { followTypeDefs, followResolver } = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefs, followTypeDefs],
  resolvers: [resolverUser, resolvers, followResolver],
  introspection: true,
});

(async () => {
  try {
    await connect();
    const db = await getDb();

    const { url } = await startStandaloneServer(server, {
      listen: process.env.PORT,

      context: async ({ req, res }) => {
        // console.log("this console will be triggered on every request");

        return {
          authentication: async () => {
            return await authentication(req);
          },
          db,
        };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    throw error;
  }
})();
