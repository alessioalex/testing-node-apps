// Testing Middleware

// 🐨 you'll need both of these:
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
test('errorMiddleware responds with 401 code and message for unauthorized', () => {
  const error = new UnauthorizedError('some_error_code', {
    message: 'Some message',
  })
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  const next = jest.fn()

  errorMiddleware(error, {}, res, next)

  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(next).not.toHaveBeenCalled()
})

// 🐨 Write a test for the headersSent case
test('errorMiddleware delegates to next if headers already sent', () => {
  const res = {
    headersSent: true,
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()
  const error = new Error('sample error')

  errorMiddleware(error, {}, res, next)
  expect(next).toHaveBeenCalledWith(error)
  expect(next).toHaveBeenCalledTimes(1)

  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
test('errorMiddleware responds with 500 for other cases', () => {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()
  const error = new Error('sample error')

  errorMiddleware(error, {}, res, next)

  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack,
  })
  expect(res.json).toHaveBeenCalledTimes(1)

  expect(next).not.toHaveBeenCalled()
})
