import { ApolloServer } from "@apollo/server";
import { User } from "../graphql/index.mjs";

async function createGraphqlServer() {
  const gpql = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
            type Query{
                ${User.queries}
                }
                type Mutation{
                    ${User.mutations}
                    }
                    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await gpql.start();
  return gpql;
}

export default createGraphqlServer;
