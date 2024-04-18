import getPosts from './get-posts.js'
import getPost from './get-post.js'
import createPost from './create-post.js'
import deletePost from './delete-post.js'
import likePost from './like-post.js'
import getPostAuthor from './get-post-user.js'
import getIsLiked from './get-is-liked.js'

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
		user: getPostAuthor,
		totalLikes: parent => parent.likes.length,
		isLiked: getIsLiked
	}
}

export default postsResolvers
