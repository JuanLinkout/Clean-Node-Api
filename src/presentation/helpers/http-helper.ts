import { ServerError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const internalServerError = (): HttpResponse => ({
  body: new ServerError(),
  statusCode: 500,
})

export const ok = (): HttpResponse => ({
  body: undefined,
  statusCode: 200,
})
