import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: Date,
})

export default model('User', userSchema)