import { UserRole } from '@domain/User';
import * as yup from 'yup'

export const patchUserSchema = yup.object().shape({
    email: yup
        .string()
        .email(),
    name: yup
        .string(),                
    role: yup
        .string()
        .oneOf(Object.values(UserRole), `role must be ${Object.values(UserRole).join(' or ')}!`)        
});

export type PatchUserRequest = yup.InferType<typeof patchUserSchema>
