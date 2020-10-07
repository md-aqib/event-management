const { GraphQLServer } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Register = require("./resolvers/Register");

const resolvers = {
  Query,
  Mutation,
  Register,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
