export default `
  type User {
    createdAt: String
    email: String
    firstName: String
    id: ID
    lastName: String
    privileges: [String]
    updatedAt: String
  }

  type Token {
    token: String
  }

  type Mutation {
    login(email: String!, password: String!, remember: Boolean!): Token
    forgotPassword(email: String!): Token
    resetPassword(password: String!, token: String!): User
    signup(email: String!, firstName: String!, lastName: String!, password: String!): User
  }

  type Query {
    user(email: String!): User
  }
`
