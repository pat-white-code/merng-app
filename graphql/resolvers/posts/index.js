import getPosts from './get-posts.js'
import getPost from './get-post.js'
import createPost from './create-post.js'
import deletePost from './delete-post.js'
import likePost from './like-post.js'
import getPostAuthor from './get-post-user.js'

const postsResolvers = {
	Query: {
		posts: getPosts,
		post: getPost,
	},
	Mutation: {
		createPost,
		deletePost,
		likePost
	},
	Post: {
		userId: parent => parent.user,
		user: getPostAuthor
	}
}

export default postsResolvers
