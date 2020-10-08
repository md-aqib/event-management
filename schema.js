const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date
  type Query {
    info: String!
    events: [Event!]!
  }

  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      phone: Int
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    changepassword(newPassword: String!, oldPassword: String!): Register
    resetpassword(email: String!): Message
    logout(token: String!): Message
    event(
      eventName: String!
      eventDetails: String!
      createdBy: String!
      date: Date!
    ): Event
    invite(email: String!, eventName: String!): Message
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
    name: String!
    email: String!
    password: String!
    phone: Int!
    invitedInEvents: [Event!]
  }

  type Event {
    id: ID!
    eventName: String!
    eventDetails: String!
    createdBy: String!
    date: Date!
    invited: [Register!]
  }
`;
module.exports = typeDefs;
