const typeDefs = `#graphql
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input LoginInput {
        username: String!,
        password: String!
    }
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
    type Query {
        posts: [Post]
        post(postId: ID!): Post!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
    }
`

export default typeDefs
