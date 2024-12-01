import { iocContainer, TYPES_REPOSITORY } from "@config/IoCConfig";
import { UserRepository } from "@infra/dataprovider/dynamodb/repositories/UserRepository";

export let mockUserRepository: UserRepository;

beforeAll(() => {
    mockUserRepository = new UserRepository();

    jest.spyOn(iocContainer, 'get').mockImplementation((type: symbol) => {
        if (type === TYPES_REPOSITORY.UserRepository) {
            return mockUserRepository;
        }
    });
});

afterEach(() => {
    jest.clearAllMocks();
});
