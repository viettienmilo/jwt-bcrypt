import joi from 'joi'

export const userRegisterSchema = joi.object({
    username: joi.string().min(4).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
    confirmPassword: joi.ref('password'),
    role: joi.string().valid('USER', 'ADMIN').default('USER'),
});

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
});

export const forgotPasswordEmailSchema = joi.object({
    email: joi.string().email().required(),
});