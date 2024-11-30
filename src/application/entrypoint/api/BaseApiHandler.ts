import ErrorHandler from '@application/error-handler/ErrorHandler';
import { APIGatewayProxyResult } from 'aws-lambda';

export class HandlerWrapper {
    static wrap<TEvent>(
        handler: (event: TEvent) => Promise<APIGatewayProxyResult>
    ): (event: TEvent) => Promise<APIGatewayProxyResult> {
        return async (event: TEvent): Promise<APIGatewayProxyResult> => {
            try {
                return await handler(event);
            } catch (error) {
                return ErrorHandler.handleApiError(error);
            }
        };
    }
}
