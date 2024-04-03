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
    input CreatePostInput {
        body: String!
    }
    input CreateCommentInput {
        body: String!
        postId: String!
    }
    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
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
        createPost(createPostInput: CreatePostInput): Post!
        deletePost(postId: ID!): String
        createComment(createCommentInput: CreateCommentInput): Post!
        deleteComment(commentId: ID!, postId: ID!): Post!
    }
`

export default typeDefs
