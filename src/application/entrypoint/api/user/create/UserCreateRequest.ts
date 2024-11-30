import { UserRole } from '@domain/User';
import * as yup from 'yup'

export const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()        
        .required(),
    role: yup
        .string()
        .oneOf(Object.values(UserRole), `role must be ${Object.values(UserRole).join(' ou ')}!`)
        .required(),
});

export type CreateUserRequest = yup.InferType<typeof createUserSchema>
