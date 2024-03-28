import { model, Schema } from 'mongoose'

const postSchema = new Schema({
	body: String,
	username: String,
	createdAt: String,
	comments: [
		{
			body: String,
			userName: String,
			createdAt: Date,
		},
	],
	likes: [
		{
			userName: String,
			createdAt: Date,
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

export default model('Post', postSchema)
