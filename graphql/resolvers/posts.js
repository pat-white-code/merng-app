import { GraphQLError } from 'graphql'
import Post from '../../models/Post.js'
import checkAuth from '../../util/auth.js'

const getPosts = async () => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 })
		return posts
	} catch (err) {
		throw new Error(err)
	}
}

const getPost =  async (_, { postId }) => {
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

const deletePost = async (_, { postId }, context) => {
	const user = checkAuth(context)

	try {
		debugger
		const post = await Post.findById(postId)
		
		if (!post) {
			throw new GraphQLError('Post not found')
		}

		if (post.username === user.username) {
			await post.deleteOne()
			return 'Post successfully deleted'
		} else {
			throw new GraphQLError('Authentication failed')
		}
	} catch (err) {
		throw new Error(err)
	}
}

const createPost = async (_, { createPostInput: { body } }, context) => {
	const user = checkAuth(context)
	const newPost = new Post({
		body,
		user: user.id,
		username: user.username,
		createdAt: new Date().toISOString(),
	})
	const post = await newPost.save()
	return post
}

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
