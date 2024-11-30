import { UserRole } from '@domain/User';
import * as yup from 'yup'

export const getAllUserSchema = yup.object().shape({
    id: yup
        .string()    ,
    email: yup
        .string()
        .email(),
    name: yup
        .string(),                
    role: yup
        .string()
        .oneOf(Object.values(UserRole), `role must be ${Object.values(UserRole).join(' or ')}!`)  
});

export type UserGetAllRequest = yup.InferType<typeof getAllUserSchema>
