import { validateRegisterInput } from './validators.js'
import { describe, expect, test } from '@jest/globals'

describe('validateRegisterInput', () => {
	test('rejects bad emails', () => {
		const badEmail = {
			email: 'mybademail',
			username: 'good-username',
			password: 'validpassword',
			confirmPassword: 'validpassword',
		}
		const { isValid, errors } = validateRegisterInput(badEmail)

		expect(isValid).toBe(false)
		expect(errors.email).toBe('Email must be valid email address')
	})
	test('rejects empty emails', () => {
		const badEmail = {
			email: '',
			username: 'good-username',
			password: 'validpassword',
			confirmPassword: 'validpassword',
		}
		const { isValid, errors } = validateRegisterInput(badEmail)

		expect(isValid).toBe(false)
		expect(errors.email).toBe('Email must be valid email address')
	})
	test('rejects empty username', () => {
		const badEmail = {
			email: 'mygoodEmail@fake.com',
			username: '',
			password: 'validpassword',
			confirmPassword: 'validpassword',
		}
		const { isValid, errors } = validateRegisterInput(badEmail)
		expect(errors.username).toBe('Username must not be empty')

		expect(isValid).toBe(false)
	})
	test('rejects mismatch passwords', () => {
		const badEmail = {
			email: 'mygoodEmail@fake.com',
			username: 'good-username',
			password: 'mismatch-1',
			confirmPassword: 'mismatch-2',
		}
		const { isValid, errors } = validateRegisterInput(badEmail)

		expect(isValid).toBe(false)
		expect(errors.password).toBe('Passwords must match.')
	})
	test('rejects empty password', () => {
		const badEmail = {
			email: 'mygoodEmail@fake.com',
			username: 'good-username',
			password: '',
			confirmPassword: '',
		}
		const { isValid, errors } = validateRegisterInput(badEmail)

		expect(isValid).toBe(false)
		expect(errors.password).toBe('Password must not be empty')
	})

	test('collects multiple errors', () => {
		const badEmail = {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		}
		const { isValid, errors } = validateRegisterInput(badEmail)

		expect(isValid).toBe(false)
		expect(errors.email).toBe('Email must be valid email address')
		expect(errors.username).toBe('Username must not be empty')
		expect(errors.password).toBe('Password must not be empty')
	})
})
