const { GraphQLServer } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Event = require("./resolvers/Event");
const models = require("../models");

const resolvers = {
  Event,
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
