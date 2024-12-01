import { ApiError } from "@application/error-handler/ApiError";
import { iocContainer, TYPES_REPOSITORY } from "@config/IoCConfig";
import { UserRepository } from "@infra/dataprovider/dynamodb/repositories/UserRepository";
import { StatusCodes } from "http-status-codes";
import { MiddyApiGatewayEvent } from "../../ApiGatewayEvent";
import { patchUserUseCase } from "./UserPatchApi";
import { UserRole } from "@domain/User";

describe('User Patch Handler', () => {
    let mockUserRepository: UserRepository;

    const mockUser = {
        userId: '123',
        name: 'Jef S',
        email: 'jefs@example.com',
        role: UserRole.Admin,
    };

    beforeEach(() => {
        mockUserRepository = new UserRepository();
        jest.spyOn(iocContainer, 'get').mockImplementation((type: symbol) => {
            if (type === TYPES_REPOSITORY.UserRepository) {
                return mockUserRepository;
            }
        });
    });

    it('should return 404 if user is not found', async () => {
        mockUserRepository.getById = jest.fn().mockResolvedValue(null);

        const event = {
            body: { name: 'Jeff S' },
            pathParameters: { userId: '123' },
        } as MiddyApiGatewayEvent;

        await expect(patchUserUseCase(event)).rejects.toThrow(
            new ApiError(StatusCodes.NOT_FOUND, 'user not found')
        );
    });

    it('should update the user and return no content', async () => {
        mockUserRepository.getById = jest.fn().mockResolvedValue(mockUser);
        mockUserRepository.update = jest.fn().mockResolvedValue(mockUser);

        const event = {
            body: { name: 'Updated Jeff', email: 'updateemail@example.com', role: 'client' },
            pathParameters: { userId: '123' },
        } as MiddyApiGatewayEvent;

        const response = await patchUserUseCase(event);

        expect(mockUserRepository.update).toHaveBeenCalledWith({
            ...mockUser,
            name: 'Updated Jeff',
            email: 'updateemail@example.com',
            role: 'client'
        });

        expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
});