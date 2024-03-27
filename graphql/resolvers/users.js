import User from '../../models/User.js'

const usersResolvers = {
    Mutation: {
        register: async (_, { registerInput: { email, password, confirmPassword, username }}, ) => {
            const user = new User({
                email,
                password,
                username,
                createdAt: new Date()
            })
            await user.save()
            return user
        }
    }
}

export default usersResolvers