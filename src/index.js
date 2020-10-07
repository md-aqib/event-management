const { GraphQLServer } = require("graphql-yoga");
const register = require("./resolvers/register");

const resolvers = {
  register,
};

const prisma = new PrismaClient();

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
