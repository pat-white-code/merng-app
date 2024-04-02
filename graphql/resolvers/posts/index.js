import getPosts from './get-posts.js'
import getPost from './get-post.js'
import createPost from './create-post.js'
import deletePost from './delete-post.js'

const postsResolvers = {
	Query: {
		posts: getPosts,
		post: getPost,
	},
	Mutation: {
		createPost,
		deletePost,
	},
}

export default postsResolvers
