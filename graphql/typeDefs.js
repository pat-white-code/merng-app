const typeDefs = `#graphql
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        posts: [Post]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`

export default typeDefs
