const { gql } = require("apollo-server");
const typeDefs = gql`
directive @lower on FIELD_DEFINITION
directive @auth on FIELD_DEFINITION
scalar Date

type Query {
  _: String
}

type Mutation {
  _: String
}

type Subscription {
  _: String
}
`
module.exports = typeDefs;