import postsResolvers from './posts/index.js'
import usersResolvers from './users.js'
import commentsResolvers from './comments/index.js'

const resolvers = {
	Query: {
		...postsResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...postsResolvers.Mutation,
		...commentsResolvers.Mutation,
	},
}
export default resolvers
