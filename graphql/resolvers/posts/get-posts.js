import Post from '../../../models/Post.js'

const getPosts = async () => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 })
		return posts
	} catch (err) {
		throw new Error(err)
	}
}

export default getPosts
