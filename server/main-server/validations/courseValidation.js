import joi from 'joi'

const courseValidation = joi.object({
    courseCode: joi.string().trim().required(),
    courseName: joi.string().trim().required(),
    credits: joi.number().positive().min(1).max(3).required(),
    description: joi.string().optional(),
});

export default courseValidation;