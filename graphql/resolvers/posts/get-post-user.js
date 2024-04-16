import { GraphQLError } from 'graphql'
import User from '../../../models/User.js'

const getPostAuthor = async (parent) => {
    try {
        const userId = parent.user
        const user = await User.findById(userId)
        return user
    } catch {
        throw new GraphQLError('User not found')
    }
} 

export default getPostAuthor