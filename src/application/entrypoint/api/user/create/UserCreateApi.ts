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
import { created } from '@application/error-handler/ErrorResponse';
import { SecurityHelper } from '@infra/helper/SecurityHelper';
import { ApiError } from '@application/error-handler/ApiError';
import { StatusCodes } from 'http-status-codes';

export const createUserUseCase = async (
    event: MiddyApiGatewayEvent<CreateUserRequest>
): Promise<APIGatewayProxyResult> => {
    const request = event.body

    const repository = iocContainer.get<UserRepository>(TYPES_REPOSITORY.UserRepository)

    const existsByEmail = await repository.getByEmail(request.email)

    if(existsByEmail) throw new ApiError(StatusCodes.CONFLICT, `e-mail "${request.email}" in use`, `email_in_use`)

    const user = Builder(User)
                .id(v4())
                .name(request.name)
                .email(request.email)
                .role(request.role)
                .hashedPassword((await SecurityHelper.sha256Hash(request.password)))
                .build()

    await repository.create(user)

    return created({id: user.id})
};

export const handler = middleware(
    HandlerWrapper.wrap(createUserUseCase),
    { body: createUserSchema }
);