import { GraphQLError } from 'graphql'
import Post from '../../../models/Post.js'
import checkAuth from '../../../util/auth.js'

const deletePost = async (_, { postId }, context) => {
	const user = checkAuth(context)

	try {
		const post = await Post.findById(postId)

		if (!post) {
			throw new GraphQLError('Post not found')
		}

		if (post.username === user.username) {
			await post.deleteOne()
			return 'Post successfully deleted'
		} else {
			throw new GraphQLError('Authentication failed')
		}
	} catch (err) {
		throw new Error(err)
	}
}

export default deletePost
