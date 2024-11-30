import { StatusCodes } from "http-status-codes"

export class ApiError extends Error {
    statusCode: number
    message: any
    name: string

    constructor(statusCode: StatusCodes, message: any, name: string = '') {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.name = name
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}