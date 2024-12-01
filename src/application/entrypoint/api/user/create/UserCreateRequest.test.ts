import { UserRole } from '@domain/User';
import { ValidationError } from 'yup';
import { createUserSchema } from './UserCreateRequest';

describe('create user schema validation test', () => {
  it('should validate a correct user creation request', async () => {
    const validUser = {
      name: 'Jeff S',
      email: 'jeff.s@example.com',
      password: 'password123',
      role: UserRole.Admin, 
    };

    await expect(createUserSchema.isValid(validUser)).resolves.toBe(true);
  });

  it('should throw an error if required fields are missing', async () => {
    const invalidUser = {
      name: '',
      email: 'invalidemail.com',
      password: '',
      role: 'invalid-role',
    };

    await expect(createUserSchema.isValid(invalidUser)).resolves.toBe(false);
  });

  it('should throw an error for an invalid email', async () => {
    const invalidUser = {
      name: 'Jef S',
      email: 'invalid-email',
      password: 'password123',
      role: UserRole.Client,
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrowError(ValidationError);
  });

  it('should throw an error for an invalid role', async () => {
    const invalidUser = {
      name: 'Jef s',
      email: 'jeff.s@example.com',
      password: 'password123',
      role: 'invalid-role', 
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrowError(ValidationError);
  });

  it('should throw an error for missing required fields', async () => {
    const invalidUser = {
      name: '',
      email: '',
      password: '',
      role: '', 
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrowError(ValidationError);
  });
});
