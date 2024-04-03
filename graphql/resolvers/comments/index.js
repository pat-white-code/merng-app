import createComment from './create-comment.js'
import deleteComment from './delete-comment.js'

const commentsResolvers = {
	Mutation: {
		createComment,
		deleteComment,
	},
}

export default commentsResolvers
