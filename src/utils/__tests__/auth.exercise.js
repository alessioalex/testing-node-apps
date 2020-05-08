import {isPasswordAllowed} from '../auth'

test('isPasswordAllowed returns false for invalid passwords', () => {
  const shortPassword = 'a2c!'
  const noAlphabetCharPwd = '123456!'
  const noNumberPwd = 'ABCdef!'
  const noUpperCasePwd = 'abc123!'
  const noLowerCasePwd = 'ABC123!'
  const noNonAlphanumericPwd = 'ABCdef123'

  expect(isPasswordAllowed(shortPassword)).toBe(false)
  expect(isPasswordAllowed(noAlphabetCharPwd)).toBe(false)
  expect(isPasswordAllowed(noNumberPwd)).toBe(false)
  expect(isPasswordAllowed(noUpperCasePwd)).toBe(false)
  expect(isPasswordAllowed(noLowerCasePwd)).toBe(false)
  expect(isPasswordAllowed(noNonAlphanumericPwd)).toBe(false)
})

test('isPasswordAllowed returns true for valid passwords', () => {
  expect(isPasswordAllowed('!aBc123')).toBe(true)
})
