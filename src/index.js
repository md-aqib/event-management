const { GraphQLServer } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const models = require("../models");

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      models,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
