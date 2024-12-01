import { APIGatewayProxyResult } from 'aws-lambda';
import { middleware } from '@application/middleware/BaseMiddleware';
import { HandlerWrapper } from '../../BaseApiHandler';
import { MiddyApiGatewayEvent } from '../../ApiGatewayEvent';
import { TYPES_REPOSITORY, iocContainer } from '@config/IoCConfig';
import { UserRepository } from '@infra/dataprovider/dynamodb/repositories/UserRepository';
import { ApiError } from '@application/error-handler/ApiError';
import { StatusCodes } from 'http-status-codes';
import { noContent } from '@application/error-handler/ErrorResponse';
import { PatchUserRequest, patchUserSchema } from './UserPatchRequest';
import { GetUserByIdRequest, getUserByIdRequest } from '../get/UserGetByIdRequest';


export const patchUserUseCase = async (
    event: MiddyApiGatewayEvent<PatchUserRequest, GetUserByIdRequest>
): Promise<APIGatewayProxyResult> => {
    const body = event.body
    const path = event.pathParameters

    const repository = iocContainer.get<UserRepository>(TYPES_REPOSITORY.UserRepository)

    const user = await repository.getById(path.userId)

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, `user not found`)
    }

    await repository.update({
        ...user,
        ...(body.name !== null && { name: body.name }),
        ...(body.role !== null && { role: body.role }),
        ...(body.email !== null && { email: body.email }),
    })

    return noContent()
};

export const handler = middleware(
    HandlerWrapper.wrap(patchUserUseCase),
    { body: patchUserSchema, pathVar: getUserByIdRequest }
);