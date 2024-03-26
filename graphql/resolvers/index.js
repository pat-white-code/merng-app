import postsResolvers from './posts.js'

const resolvers = {
    Query: {
        ...postsResolvers.Query
    }
}
export default resolvers