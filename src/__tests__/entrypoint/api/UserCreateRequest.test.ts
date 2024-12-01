import { createUserSchema } from '@application/entrypoint/api/user/create/UserCreateRequest';
import { UserRole } from '@domain/User';
import { ValidationError } from 'yup';

describe('create user schema validation test', () => {
  const validUser = {
    name: 'Jeff S',
    email: 'jeff.s@example.com',
    password: 'Password@123',
    role: UserRole.Admin, 
  };

  it('should validate a correct user creation request', async () => {
    await expect(createUserSchema.isValid(validUser)).resolves.toBe(true);
  });

  it('should throw an error if required fields are missing', async () => {
    const invalidUser = {
      ...validUser,
      role: 'invalid-role',
    };

    await expect(createUserSchema.isValid(invalidUser)).resolves.toBe(false);
  });

  it('should throw an error for an invalid email', async () => {
    const invalidUser = {
      ...validUser,
      email: 'invalid-email',
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrow(ValidationError);
  });

  it('should throw an error for an invalid role', async () => {
    const invalidUser = {
      ...validUser,
      role: 'invalid-role', 
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrow(ValidationError);
  });

  it('should throw an error for an invalid password policy', async () => {
    const invalidUser = {
      ...validUser,
      role: '123456', 
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrow(ValidationError);
  });

  it('should throw an error for missing required fields', async () => {
    const invalidUser = {
      name: '',
      email: '',
      password: '',
      role: '', 
    };

    await expect(createUserSchema.validate(invalidUser)).rejects.toThrow(ValidationError);
  });

});
