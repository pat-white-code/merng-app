import createComment from './create-comment.js'

const commentsResolvers = {
	Mutation: {
		createComment,
	},
}

export default commentsResolvers
