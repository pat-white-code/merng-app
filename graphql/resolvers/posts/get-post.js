import { GraphQLError } from 'graphql'
import Post from '../../../models/Post.js'

const getPost = async (_, { postId }) => {
	try {
		const post = await Post.findById(postId)
		if (post) {
			return post
		} else {
			throw new GraphQLError('Post not found')
		}
	} catch (err) {
		throw new Error(err)
	}
}

export default getPost
