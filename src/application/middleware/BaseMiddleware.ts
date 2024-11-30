import middy from 'middy'
import { Schema } from 'yup'
import { httpErrorHandler, jsonBodyParser } from 'middy/middlewares'
import { validationMiddleware } from './ValidationMiddleware'

export interface InputSchema {
    body?: Schema
    queryString?: Schema
    pathVar?: Schema
}

export const middleware = (handler: any, inputSchema?: InputSchema) =>
    middy(handler).use(jsonBodyParser()).use(validationMiddleware(inputSchema)).use(httpErrorHandler())
