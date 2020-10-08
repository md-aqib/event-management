const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const Mutation = require("./resolvers/Mutation");
const Event = require("./resolvers/Event");
const Query = require("./resolvers/Query");
const models = require("./models");
const app = express();

const resolvers = {
  Event,
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => {
    return {
      ...request,
      models,
    };
  },
});

server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}ql`)
);
