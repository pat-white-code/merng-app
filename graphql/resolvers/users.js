import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {} from 'dotenv'
import { GraphQLError } from 'graphql'

import User from '../../models/User.js'
import {
	validateRegisterInput,
	validateLoginInput,
} from '../../util/validators.js'

const generateToken = (user) => {
	const SECRET_KEY = process.env.SECRET_KEY
	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: '1h' }
	)
	return token
}

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
		createdAt: new Date().toDateString(),
	})

	const res = await user.save()

	const token = generateToken(user)

	return {
		...res._doc,
		id: res._id,
		password,
		token,
	}
}

const login = async (_, { loginInput: { username, password } }) => {
	const { errors, isValid } = validateLoginInput({ username, password })

	if (!isValid) {
		throw new GraphQLError('Invalid User Input', {
			extensions: {
				errors,
				code: 'INVALID_USER_INPUT',
				argumentName: 'loginInput',
			},
		})
	}

	const user = await User.findOne({ username })

	if (!user) {
		throw new GraphQLError('Username not found', {
			extensions: {
				code: 'USER_NOT_FOUND',
				argumentName: 'loginInput',
			},
		})
	}

	const match = bcrypt.compare(password, user.password)
	if (!match) {
		throw new GraphQLError('Password is not correct', {
			extensions: {
				code: 'INVALID_CREDENTIALS',
				argumentName: 'loginInput',
			},
		})
	}
	if (match) {
		const token = generateToken(user)
		return {
			...user._doc,
			id: user._id,
			token,
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
