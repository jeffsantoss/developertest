import * as yup from 'yup'

export const getUserByIdRequest = yup.object().shape({
    userId: yup
        .string()
        .required(),
});

export type GetUserByIdRequest = yup.InferType<typeof getUserByIdRequest>
