import { InputSchema } from './BaseMiddleware'
import ErrorHandler from '@application/error-handler/ErrorHandler'
import { ApiError } from '@application/error-handler/ApiError'
import { StatusCodes } from 'http-status-codes'

export const validationMiddleware = (inputSchema?: InputSchema) => {
    const before = async (request) => {
        try {
            if (inputSchema?.body) {
                const parsedBody = request.event.body || {};
                console.info(`Dados da requisição body: ${JSON.stringify(parsedBody)}`)
                await inputSchema.body.validate(parsedBody, { abortEarly: false })
            } 
            
            if (inputSchema?.queryString) {
                const queryString = request.event?.queryStringParameters || {}
                console.info(`Dados da requisição query: ${JSON.stringify(queryString)}`)
                await inputSchema.queryString.validate(queryString, {
                    abortEarly: false,
                })
            } 
            
            if (inputSchema?.pathVar) {
                const path = request.event?.pathParameters || {}
                console.info(`Dados da requisição path: ${JSON.stringify(path)}`)
                await inputSchema.pathVar.validate(path, { abortEarly: false })
            }
        
            return Promise.resolve()
        } catch (error) {
            throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error?.errors?.join(" | "), "validation_error")            
        }
    }

    return {
        before,
    }
}
