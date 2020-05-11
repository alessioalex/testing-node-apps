import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

cases(
  'isPasswordAllowed: valid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    },
  },
)

cases(
  'isPasswordAllowed: invalid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  {
    'too short': {
      password: 'a2C!',
    },
    'no letters': {
      password: '12345678!',
    },
    'no numbers': {
      password: 'ABCdef!',
    },
  },
)

const tests = [
  {input: '!aBc123', output: true, message: 'valid'},
  {input: 'a2C!', output: false, message: 'short'},
  {input: '123456!', output: false, message: 'no alphabet char'},
  {input: 'ABCdef!', output: false, message: 'no number'},
  {input: 'abc123!', output: false, message: 'no uppercase'},
  {input: 'ABC123!', output: false, message: 'no lowercase'},
  {input: 'ABCdef123', output: false, message: 'no non-alphanumeric'},
]

describe('isPasswordAllowed only allows some passwords', () => {
  tests.forEach(({input, output, message}) => {
    test(`isPasswordAllowed returns ${output} for ${message} passwords`, () => {
      expect(isPasswordAllowed(input)).toBe(output)
    })
  })
})
