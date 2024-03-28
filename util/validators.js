import { isEmail, isEmpty } from './strings.js'

export const validateRegisterInput = ({
	username,
	password,
	confirmPassword,
	email,
}) => {
	const errors = {}

	if (isEmpty(username)) {
		errors.username = 'Username must not be empty'
	}
	if (isEmpty(email)) {
		errors.email = 'Email must not be empty'
	}
	if (!isEmail(email)) {
		errors.email = 'Email must be valid email address'
	}
	if (isEmpty(password)) {
		errors.password = 'Password must not be empty'
	}
	if (password !== confirmPassword) {
		errors.password = 'Passwords must match.'
	}

	const isValid = Object.keys(errors).length < 1

	return { errors, isValid }
}