const { gql } = require("apollo-server");
const typeDefs = gql`

extend type Query {
    info: String!
    events(startDate: String!, endDate: String!): [Event] @auth
    getMyEvent: [Event] @auth
    getSearchedEvent(searchQuery: String!): [Event] @auth
    checkInvitation: [Event] @auth
    users: [Register]
  }

  type Register {
    id: ID!
    name: String! @lower
    email: String!
    password: String!
    phone: Int!
    token: String!
    invitedInEvents: [Event!]
  }
`


module.exports = typeDefs