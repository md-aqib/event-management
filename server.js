const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const models = require("./models");
const schemaDirectives = require('./directives/index')


const resolvers = {
  Query: Query,
  Mutation: Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req }) => {
    return {
      req,
      models,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
