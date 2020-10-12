const { ApolloServer } = require("apollo-server");
const express = require("express");
const typeDefs = require("./schema");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const models = require("./models");
const jwt = require('express-jwt')
const app = express();

const resolvers = {
  Query: Query,
  Mutation: Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // const token = req.headers.authorization;
    // console.log('LLLLLLLLLLLLLL',token)
    // const user = getUser(token);
    return {
      req,
      models,
    };
  },
});

// models.sequelize.authenticate();
// models.sequelize.sync();

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
