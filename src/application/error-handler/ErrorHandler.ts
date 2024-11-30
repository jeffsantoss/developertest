import { APIGatewayProxyResult } from 'aws-lambda';
import { StatusHandler } from './ErrorResponse';
import { ApiError } from './ApiError';

class ErrorHandler {
    static handleApiError(err: ApiError): APIGatewayProxyResult {
        console.error("An error occurred..", err);

        const statusCode = err?.statusCode || 500;
        
        const errorHandler = StatusHandler[statusCode] || this.genericErrorResponse;
        
        return errorHandler(err?.message, err?.name);
    }

    private static genericErrorResponse(): APIGatewayProxyResult {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Something went wrong' }),
        };
    }
}

export default ErrorHandler;
