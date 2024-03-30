import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {} from 'dotenv'
import { GraphQLError } from 'graphql'

import User from '../../models/User.js'
import { validateRegisterInput } from '../../util/validators.js'

const register = async (
	_,
	{ registerInput: { email, password, confirmPassword, username } }
) => {
	const { errors, isValid } = validateRegisterInput({
		email,
		password,
		confirmPassword,
		username,
	})

	if (!isValid) {
		throw new GraphQLError('User Input Error', {
			errors,
			extensions: {
				code: 'BAD_USER_INPUT',
				argumentName: 'userInput',
				errors,
			},
		})
	}
	password = await bcrypt.hash(password, 12)

	const existingUser = await User.findOne({ username })
	if (existingUser) {
		throw new GraphQLError('Username already exists.', {
			extensions: {
				code: 'USERNAME_ALREADY_EXISTS',
				argumentName: 'username',
			},
		})
	}

	const user = new User({
		email,
		password,
		username,
		createdAt: new Date(),
	})

	const res = await user.save()

	const SECRET_KEY = process.env.SECRET_KEY

	const token = jwt.sign(
		{
			id: res.id,
			email: res.email,
			username: res.username,
		},
		SECRET_KEY,
		{ expiresIn: '1h' }
	)

	return {
		...res._doc,
		id: res._id,
		password,
		token,
	}
}

const login = async (_, { loginInput: { username, password }}) => {
    const res = await User.findOne({ username })
    const foundUser = res._doc

    debugger

    if (!foundUser) {
        throw new GraphQLError('Username not found', {
			extensions: {
				code: 'USER_NOT_FOUND',
				argumentName: 'loginInput',
			},
		})
    }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if(!match) {
        throw new GraphQLError('Password is not correct', {
            extensions: {
				code: 'INVALID_CREDENTIALS',
				argumentName: 'loginInput',
			},
        })
    }
    if(match) {
        const SECRET_KEY = process.env.SECRET_KEY
        const token = jwt.sign(
            {
                id: foundUser.id,
                email: foundUser.email,
                username: foundUser.username,
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        )
        return {
            ...foundUser,
            token
        }
    }
}

const usersResolvers = {
	Mutation: {
		register,
        login,
	},
}

export default usersResolvers
