import { APIGatewayProxyResult } from 'aws-lambda'
import { StatusCodes } from 'http-status-codes'

const doReturn = (statusCode: StatusCodes, body?: any) => {    
    return {
        statusCode: statusCode.valueOf(),
        headers: {
            'Cache-Control': 'no-store',
            'access-control-allow-origin': '*',
            'Content-Type': 'application/json',
        },
        ...(body && { body: JSON.stringify(body) }),
    }
}

const doErrorReturn = (statusCode: StatusCodes, message: string, name: string) =>
    doReturn(statusCode, { code: name, message })

export const ok = (body?: any) => doReturn(StatusCodes.OK, body)

export const created = (body: any) => doReturn(StatusCodes.CREATED, body)

export const noContent = (headers?: Headers) => doReturn(StatusCodes.NO_CONTENT, headers)

export const badRequest = (reason: string, name: string) => doErrorReturn(StatusCodes.BAD_REQUEST, reason, name || 'bad_request')

export const notFound = (reason: string, name: string) => doErrorReturn(StatusCodes.NOT_FOUND, reason, name || "resource_not_found")

export const conflict = (reason: string, name: string) => doErrorReturn(StatusCodes.CONFLICT, reason, name || "conflict")

export const unprocessableEntity = (reason: string, name: string) => doErrorReturn(StatusCodes.UNPROCESSABLE_ENTITY, reason, name || "validation_error")

type StatusHandlerFunction = (message: string, name: string) => APIGatewayProxyResult

interface StatusHandler {
    [key: string]: StatusHandlerFunction
}

export const StatusHandler: StatusHandler = {
    [StatusCodes.BAD_REQUEST]: badRequest,
    [StatusCodes.UNPROCESSABLE_ENTITY]: unprocessableEntity,
    [StatusCodes.NOT_FOUND]: notFound,
    [StatusCodes.CONFLICT]: conflict
}

