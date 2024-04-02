import Post from '../../models/Post.js'
import checkAuth from '../../util/auth.js'

const postsResolvers = {
	Query: {
		posts: async () => {
			try {
				const posts = await Post.find()
				return posts
			} catch (err) {
				throw new Error(err)
			}
		},
		post: async (_, { postId }) => {
			try {
				const post = await Post.findById(postId)
				debugger
				if (post) {
					return post
				} else {
					throw new Error('Post not found')
				}
			} catch (err) {
				throw new Error(err)
			}
		}
	},
	Mutation: {
		createPost: async (_, { createPostInput: { body } }, context) => {
			const user = checkAuth(context)
			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString()
			})
			const post = await newPost.save()
			return post
		}
	}
}

export default postsResolvers
