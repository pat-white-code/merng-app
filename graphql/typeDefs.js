const typeDefs = `#graphql
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query {
        posts: [Post]
    }
`;

export default typeDefs