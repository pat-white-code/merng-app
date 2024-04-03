import { GraphQLError } from 'graphql'
import Post from '../../../models/Post.js'
import checkAuth from '../../../util/auth.js'

const deleteComment = async (_, { commentId, postId }, context) => {
	const { username } = checkAuth(context)

	const post = await Post.findById(postId)

	if (!post) {
		throw new GraphQLError('Post not Found')
	}

	const comment = post.comments.find((comment) => comment.id === commentId)._doc

	if (comment.username && comment.username !== username) {
		throw new GraphQLError('Not Authorized')
	}

	post.comments = post.comments.filter((comment) => comment.id !== commentId)
	await post.save()
	return post
}

export default deleteComment
