import joi from 'joi'

const userProfileSchema = joi.object({
    username: joi.string().trim().min(4).max(20).optional(),
    studentCode: joi.string().trim().required(),
    firstname: joi.string().trim().required(),
    lastname: joi.string().trim().required(),
    birthdate: joi.date().required(),
    gender: joi.string().valid('Male', 'Female').default('Male'),
    phone: joi.string().optional(),
    city: joi.string().optional(),
    avatarUrl: joi.string().optional(),
    role: joi.string().optional(),
    status: joi.string().optional(),
});

export { userProfileSchema }