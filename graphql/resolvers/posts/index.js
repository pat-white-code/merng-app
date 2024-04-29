import getPosts from './get-posts.js'
import getPost from './get-post.js'
import createPost from './create-post.js'
import deletePost from './delete-post.js'
import likePost from './like-post.js'
import getPostAuthor from './get-post-user.js'
import getIsLiked from './get-is-liked.js'
import User from '../../../models/User.js'
import { GraphQLError } from 'graphql'

const getCommentAuthor = async (parent) => {
	try {
		const userId = parent.user
		const user = await User.findById(userId)
		return user
	} catch(err) {
		throw new GraphQLError('User not found')
	}
}

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
		isLiked: getIsLiked,
		totalComments: parent => parent.comments.length
	},
	Comment: {
		user: getCommentAuthor
	}
}

export default postsResolvers
