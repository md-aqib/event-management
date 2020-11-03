const { gql } = require("apollo-server");
const typeDefs = gql`
  directive @lower on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION
  scalar Date

  type Query {
    info: String!
    events(startDate: String!, endDate: String!): [Event] @auth
    getMyEvent: [Event] @auth
    getSearchedEvent(searchQuery: String!): [Event] @auth
    checkInvitation: [Event] @auth
    users: [Register]
  }

  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      phone: Int
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    changepassword(newPassword: String!, oldPassword: String!): Message @auth
    resetpassword(email: String!): Message
    logout: Message @auth
    addevent(
      eventName: String!
      eventDetails: String!
      date: Date!
    ): Event @auth
    invite(email: String!, eventName: String!): Message @auth
  }

  type Message {
    message: String
  }

  type AuthPayload {
    token: String
    user: Register
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

  type Event {
    id: ID!
    eventName: String!
    eventDetails: String!
    createdBy: String!
    date: Date!
    invited: [String!]
  }
`;
module.exports = typeDefs;
