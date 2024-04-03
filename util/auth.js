import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY

const checkAuth = (context) => {
	const authHeader = context.req.headers.authorization
	if (authHeader) {
		const token = authHeader.split('Bearer ')[1]
		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY)
				return user
			} catch (err) {
				throw new GraphQLError('Authentication Failed')
			}
		}
		throw new GraphQLError('Missing or improperly formatted authentication')
	}
	throw new GraphQLError('Authorization header must be provided')
}

export default checkAuth
