import { validateRegisterInput } from './validators.js'
import { describe, expect, test } from '@jest/globals'

describe('validateRegisterInput' , () => {
    test('rejects bad emails', () => {
        const badEmail = {
            email: 'mybademail',
            username: 'good-username',
            password: 'validpassword',
            confirmPassword: 'validpassword'
        }
        const { isValid, errors } = validateRegisterInput(badEmail)

        expect(isValid).toBe(false)
    })
})