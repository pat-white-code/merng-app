import { GraphQLError } from 'graphql'
import Post from '../../../models/Post.js'
import checkAuth from '../../../util/auth.js'

const likePost = async (_, { postId }, context) => {
	const { username } = checkAuth(context)
	const post = await Post.findById(postId)

	if (!post) {
		throw new GraphQLError('Post not found')
	}

	const likedIndex = post.likes.findIndex((like) => like.username === username)
	const isLiked = likedIndex !== -1

	if (isLiked) {
		post.likes = post.likes.filter((like) => like.username && like.username !== username)
		await post.save()
		return post
	} else {
		const like = {
			username,
			createdAt: new Date().toISOString(),
		}
		post.likes.push(like)
		await post.save()
		return post
	}
}

export default likePost
