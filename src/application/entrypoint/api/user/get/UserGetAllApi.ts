import { APIGatewayProxyResult } from 'aws-lambda';
import { middleware } from '@application/middleware/BaseMiddleware';
import { HandlerWrapper } from '../../BaseApiHandler';
import { MiddyApiGatewayEvent } from '../../ApiGatewayEvent';
import { TYPES_REPOSITORY, iocContainer } from '@config/IoCConfig';
import { UserRepository } from '@infra/dataprovider/dynamodb/repositories/UserRepository';
import { ok } from '@application/error-handler/ErrorResponse';
import { UserGetAllRequest, getAllUserSchema } from './UserGetAllRequest';
import { Builder } from 'builder-pattern';
import { User, UserRole } from '@domain/User';
import { EnumHelper } from '@infra/helper/EnumHelper';

export const getAllUsersUseCase = async (
    event: MiddyApiGatewayEvent<undefined, undefined, UserGetAllRequest>
): Promise<APIGatewayProxyResult> => {
    const queryParams = event.queryStringParameters

    const repository = iocContainer.get<UserRepository>(TYPES_REPOSITORY.UserRepository)

    const filter = Builder(User).id(queryParams?.id)
        .email(queryParams?.email)
        .name(queryParams?.name)
        .role(EnumHelper.toEnumValue(UserRole, queryParams?.role))
        .build()

    const user = await repository.findByAnyField(filter)

    return ok(user)
};

export const handler = middleware(
    HandlerWrapper.wrap(getAllUsersUseCase),
    { queryString: getAllUserSchema }
);