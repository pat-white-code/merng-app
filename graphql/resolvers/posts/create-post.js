import Post from '../../../models/Post.js'
import checkAuth from '../../../util/auth.js'

const createPost = async (_, { createPostInput: { body } }, context) => {
	const user = checkAuth(context)
	const newPost = new Post({
		body,
		user: user.id,
		username: user.username,
		userId: user.id,
		createdAt: new Date().toDateString(),
	})
	const post = await newPost.save()
	return post
}

export default createPost
