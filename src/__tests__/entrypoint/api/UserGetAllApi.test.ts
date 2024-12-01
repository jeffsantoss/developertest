import { StatusCodes } from "http-status-codes";
import { UserRole } from "@domain/User";
import { APIGatewayProxyResult } from "aws-lambda";
import { MiddyApiGatewayEvent } from "@application/entrypoint/api/ApiGatewayEvent";
import { getAllUsersUseCase } from "@application/entrypoint/api/user/get/UserGetAllApi";
import { mockUserRepository } from "@tests/JestSetup";

describe('User Get All Handler', () => {
    const mockUsers = [
        { userId: '123', name: 'Jef S', email: 'jefs@example.com', role: UserRole.Admin },
        { userId: '124', name: 'Jef S 2', email: 'jefs2@example.com', role: UserRole.Client },
    ];

    it('should return an empty array if no users are found', async () => {
        mockUserRepository.findByAnyField = jest.fn().mockResolvedValue([]);

        const event = {
            queryStringParameters: { id: '999' }
        } as MiddyApiGatewayEvent;

        const response: APIGatewayProxyResult = await getAllUsersUseCase(event);

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body)).toEqual([]);
    });

    it('should return filtered users based on query parameters', async () => {
        mockUserRepository.findByAnyField = jest.fn().mockResolvedValue(mockUsers);

        const event = {
            queryStringParameters: { role: UserRole.Admin },
        } as MiddyApiGatewayEvent;

        const response: APIGatewayProxyResult = await getAllUsersUseCase(event);

        expect(mockUserRepository.findByAnyField).toHaveBeenCalledWith(
            expect.objectContaining({
                role: UserRole.Admin,
            })
        );

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body)).toEqual(mockUsers);
    });

    it('should return users matching specific filters', async () => {
        mockUserRepository.findByAnyField = jest.fn().mockResolvedValue([mockUsers[0]]);

        const event = {
            queryStringParameters: { email: 'jefs@example.com' },
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
