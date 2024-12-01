import { iocContainer, TYPES_REPOSITORY } from "@config/IoCConfig";
import { UserRepository } from "@infra/dataprovider/dynamodb/repositories/UserRepository";
import { StatusCodes } from "http-status-codes";
import { MiddyApiGatewayEvent } from "../../ApiGatewayEvent";
import { UserRole } from "@domain/User";
import { APIGatewayProxyResult } from "aws-lambda";
import { getAllUsersUseCase } from "./UserGetAllApi";

describe('User Get All Handler', () => {
    let mockUserRepository: UserRepository;

    const mockUsers = [
        { userId: '123', name: 'Jef S', email: 'jefs@example.com', role: UserRole.Admin },
        { userId: '124', name: 'Jane D', email: 'jane@example.com', role: UserRole.Client },
    ];

    beforeEach(() => {
        mockUserRepository = new UserRepository();
        jest.spyOn(iocContainer, 'get').mockImplementation((type: symbol) => {
            if (type === TYPES_REPOSITORY.UserRepository) {
                return mockUserRepository;
            }
        });
    });

    it('should return an empty array if no users are found', async () => {
        mockUserRepository.findByAnyField = jest.fn().mockResolvedValue([]);

        const event = {
            queryStringParameteres: { id: '999' }
        } as MiddyApiGatewayEvent;

        const response: APIGatewayProxyResult = await getAllUsersUseCase(event);

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body)).toEqual([]);
    });

    it('should return filtered users based on query parameters', async () => {
        mockUserRepository.findByAnyField = jest.fn().mockResolvedValue(mockUsers);

        const event = {
            queryStringParameteres: { role: 'Admin' },
        } as MiddyApiGatewayEvent;

        const response: APIGatewayProxyResult = await getAllUsersUseCase(event);

        expect(mockUserRepository.findByAnyField).toHaveBeenCalledWith(
            expect.objectContaining({
                role: UserRole.Admin,
            })
        );

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body)).toEqual(mockUsers); // Mock de usuários completos
    });

    it('should return users matching specific filters', async () => {
        mockUserRepository.findByAnyField = jest.fn().mockResolvedValue([mockUsers[0]]); // Apenas um usuário

        const event = {
            queryStringParameteres: { email: 'jefs@example.com' },
        } as MiddyApiGatewayEvent;

        const response: APIGatewayProxyResult = await getAllUsersUseCase(event);

        expect(mockUserRepository.findByAnyField).toHaveBeenCalledWith(
            expect.objectContaining({
                email: 'jefs@example.com'
            })
        );

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body)).toEqual([mockUsers[0]]);
    });
});
