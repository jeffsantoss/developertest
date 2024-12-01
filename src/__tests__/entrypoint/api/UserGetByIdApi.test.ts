import { ApiError } from "@application/error-handler/ApiError";
import { StatusCodes } from "http-status-codes";
import { APIGatewayProxyResult } from "aws-lambda";
import { mockUserRepository } from "@tests/jestSetup";
import { getUserByIdUseCase } from "@application/entrypoint/api/user/get/UserGetByIdApi";
import { MiddyApiGatewayEvent } from "@application/entrypoint/api/ApiGatewayEvent";

describe('User Get By Id Handler', () => {    
    const mockUser = {
        userId: '123',
        name: 'Jef S',
        email: 'jefs@example.com',
        role: 'Admin',
    };

    it('should return 404 if user is not found', async () => {
        mockUserRepository.getById = jest.fn().mockResolvedValue(null);

        const event = {
            pathParameters: { userId: '123' },
        } as MiddyApiGatewayEvent;

        await expect(getUserByIdUseCase(event)).rejects.toThrow(
            new ApiError(StatusCodes.NOT_FOUND, 'user not found')
        );
    });

    it('should return user details if user is found', async () => {
        mockUserRepository.getById = jest.fn().mockResolvedValue(mockUser);

        const event = {
            pathParameters: { userId: '123' },
        } as MiddyApiGatewayEvent;

        const response: APIGatewayProxyResult = await getUserByIdUseCase(event);

        expect(mockUserRepository.getById).toHaveBeenCalledWith('123');

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body)).toEqual(mockUser);
    });
});
