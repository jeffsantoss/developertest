import { APIGatewayProxyResult } from 'aws-lambda';
import { middleware } from '@application/middleware/BaseMiddleware';
import { HandlerWrapper } from '../../BaseApiHandler';
import { MiddyApiGatewayEvent } from '../../ApiGatewayEvent';
import { TYPES_REPOSITORY, iocContainer } from '@config/IoCConfig';
import { UserRepository } from '@infra/dataprovider/dynamodb/repositories/UserRepository';
import { ApiError } from '@application/error-handler/ApiError';
import { StatusCodes } from 'http-status-codes';
import { ok } from '@application/error-handler/ErrorResponse';
import { GetUserByIdRequest, getUserByIdRequest } from '../get/UserGetByIdRequest';

export const getUserByIdUseCase = async (
    event: MiddyApiGatewayEvent<undefined, GetUserByIdRequest, undefined>
): Promise<APIGatewayProxyResult> => {
    const path = event.pathParameters

    const repository = iocContainer.get<UserRepository>(TYPES_REPOSITORY.UserRepository)

    const user = await repository.getById(path.userId)

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, `user not found`)
    }
    
    return ok(user)
};

export const handler = middleware(
    HandlerWrapper.wrap(getUserByIdUseCase),
    { pathVar: getUserByIdRequest }
);