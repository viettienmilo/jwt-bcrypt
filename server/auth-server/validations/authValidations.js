import joi from 'joi'

export const userRegisterSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
});

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
});

export const forgotPasswordEmailSchema = joi.object({
    email: joi.string().email().required(),
});