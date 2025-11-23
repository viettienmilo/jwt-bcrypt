import joi from 'joi'

const courseValidation = joi.object({
    courseCode: joi.string().trim().required(),
    courseName: joi.string().trim().required(),
    semester: joi.string().trim().required(),
    credit: joi.number().positive().min(1).max(3).required(),
    teacherId: joi.string().required(),
});

export default courseValidation;