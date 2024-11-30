import { APIGatewayProxyResult } from 'aws-lambda';
import { middleware } from '@application/middleware/BaseMiddleware';
import { HandlerWrapper } from '../../BaseApiHandler';
import { MiddyApiGatewayEvent } from '../../ApiGatewayEvent';
import { TYPES_REPOSITORY, iocContainer } from '@config/IoCConfig';
import { UserRepository } from '@infra/dataprovider/dynamodb/repositories/UserRepository';
import { CreateUserRequest, createUserSchema } from './UserCreateRequest';
import { v4 } from 'uuid';
import { Builder } from 'builder-pattern';
import { User } from '@domain/User';
import { ApiError } from '@application/error-handler/ApiError';
import { StatusCodes } from 'http-status-codes';
import { created } from '@application/error-handler/ErrorResponse';
import { CryptHelper } from '@infra/helper/CryptHelper';

const apiHandler = async (
    event: MiddyApiGatewayEvent<CreateUserRequest>
): Promise<APIGatewayProxyResult> => {
    const request = event.body

    const repository = iocContainer.get<UserRepository>(TYPES_REPOSITORY.UserRepository)

    const user = Builder(User)
                .id(v4())
                .name(request.name)
                .email(request.email)
                .role(request.role)
                .plainTextPassword(request.password)
                .hashedPassword((await CryptHelper.hash(request.password)))
                .build()

    if(user.isValidPassword()) {
        throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, `password does not follow security policy`, 'invalid_password_policy')
    }

    await repository.create(user)

    return created({id: user.id})
};

export const handler = middleware(
    HandlerWrapper.wrap(apiHandler),
    { body: createUserSchema }
);