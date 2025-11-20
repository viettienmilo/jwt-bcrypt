import joi from 'joi'

const userProfileSchema = joi.object({
    username: joi.string().trim().min(4).max(20).required(),
    studentCode: joi.string().trim().required(),
    firstname: joi.string().trim().required(),
    lastname: joi.string().trim().required(),
    birthdate: joi.date().required(),
    gender: joi.string().valid('STUDENT', 'ADMIN').default('STUDENT'),
});

export { userProfileSchema }