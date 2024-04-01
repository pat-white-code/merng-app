import Post from '../../models/Post.js'

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
}

export default postsResolvers
