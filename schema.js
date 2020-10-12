const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date
  type Query {
    info: String!
    events(startDate: String!, endDate: String!): [Event]
    getMyEvent: [Event]
    getSearchedEvent(searchQuery: String!): [Event]
    checkInvitation: [Event]
  }

  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      phone: Int
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    changepassword(newPassword: String!, oldPassword: String!): Message
    resetpassword(email: String!): Message
    logout: Message
    addevent(
      eventName: String!
      eventDetails: String!
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
