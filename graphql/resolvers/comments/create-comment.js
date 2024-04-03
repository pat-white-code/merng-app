import { GraphQLError } from 'graphql'
import Post from '../../../models/Post.js'
import checkAuth from '../../../util/auth.js'
import { isEmpty } from '../../../util/strings.js'

const createComment = async (
	_,
	{ createCommentInput: { body, postId } },
	context
) => {
	if (isEmpty(body)) {
		throw new GraphQLError('Body must not be empty')
	}

	const { username } = checkAuth(context)

	const post = await Post.findById(postId)

	if (post) {
		const comment = {
			body,
			username,
			createdAt: new Date().toDateString(),
		}

		post.comments.push(comment)
		await post.save()
		return post
	} else {
		throw new GraphQLError('Post not found')
	}
}

export default createComment
