import { StatusCodes } from "http-status-codes";
import { APIGatewayProxyResult } from "aws-lambda";
import { MiddyApiGatewayEvent } from "@application/entrypoint/api/ApiGatewayEvent";
import { SecurityHelper } from "@infra/helper/SecurityHelper";
import { ApiError } from "@application/error-handler/ApiError";
import { UserRole } from "@domain/User";
import { createUserUseCase } from "@application/entrypoint/api/user/create/UserCreateApi";
import { mockUserRepository } from "@tests/JestSetup";

describe('User Create Handler', () => {
    const mockRequest = {
        name: 'Jef S',
        email: 'jefs@example.com',
        role: UserRole.Admin,
        password: 'abcD/123',
    };

    it('should create a user when email is not in use', async () => {
        mockUserRepository.getByEmail = jest.fn().mockResolvedValue(null)
        mockUserRepository.create = jest.fn().mockResolvedValue(undefined)

        const event = {
            body: mockRequest,
        } as MiddyApiGatewayEvent;

        SecurityHelper.sha256Hash = jest.fn().mockResolvedValue('hashedPassword');

        const response: APIGatewayProxyResult = await createUserUseCase(event);

        expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(mockRequest.email);
        expect(mockUserRepository.create).toHaveBeenCalled();
        expect(SecurityHelper.sha256Hash).toHaveBeenCalledWith(mockRequest.password);
        expect(response.statusCode).toBe(StatusCodes.CREATED);
        expect(JSON.parse(response.body).id).toBeDefined();
    });

    it('should return a conflict error if email is already in use', async () => {
        mockUserRepository.getByEmail = jest.fn().mockResolvedValue(true)
        mockUserRepository.create = jest.fn().mockResolvedValue(undefined)

        const event = {
            body: mockRequest,
        } as MiddyApiGatewayEvent;

        await expect(createUserUseCase(event)).rejects.toThrow(
            new ApiError(StatusCodes.CONFLICT, `e-mail "${mockRequest.email}" in use`, 'email_in_use')
        );

        expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(mockRequest.email);
        expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should return an error if password hashing fails', async () => {
        mockUserRepository.getByEmail = jest.fn().mockResolvedValue(null)
        mockUserRepository.create = jest.fn().mockResolvedValue(undefined)

        const event = {
            body: mockRequest,
        } as MiddyApiGatewayEvent;

        SecurityHelper.sha256Hash = jest.fn().mockRejectedValue(new Error('Hashing failed'));

        await expect(createUserUseCase(event)).rejects.toThrow('Hashing failed');
    });
});
