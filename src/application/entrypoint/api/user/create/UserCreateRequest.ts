import { UserRole } from '@domain/User';
import { SecurityHelper } from '@infra/helper/SecurityHelper';
import * as yup from 'yup'

export const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required('A senha é obrigatória.')
        .test('is-strong', 'the password must be at least 8 characters long and include numbers', (value) => {
            if (!value) return false;
            return SecurityHelper.isPasswordSecure(value); 
        }),
    role: yup
        .string()
        .oneOf(Object.values(UserRole), `role must be ${Object.values(UserRole).join(' ou ')}!`)
        .required(),
});

export type CreateUserRequest = yup.InferType<typeof createUserSchema>
