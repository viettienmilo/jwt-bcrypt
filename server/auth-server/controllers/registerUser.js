import bcrypt from 'bcrypt'
import AuthUser from '../models/AuthUser.js';
import { userRegisterSchema } from '../validations/authValidations.js';
import { ErrorResponse, SuccessResponse } from './../utils/response.js';
import { ERROR } from './../constants/errorCodes.js';

/* 1. REGISTER USER */

const registerUser = async (req, res) => {
    try {
        /* 
        1. Validate input using joi schema
        2. Validate user if existed
        3. Hash password
        4. Save new user to database
        5. Return response (for activation)
        */
        const { error, value } = userRegisterSchema.validate(req.body);
        if (error)
            return ErrorResponse(res, ERROR.VALIDATION_ERROR, 400, error.details[0].message);

        const { username, email, password } = value;
        const user = await AuthUser.findOne({ email })
        if (user)
            return ErrorResponse(res, ERROR.DUPLICATE_EMAIL, 409);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new AuthUser({
            email: email,
            passwordHash: hashedPassword,
            role: "STUDENT",
            oauth: null
        });
        await newUser.save();

        return SuccessResponse(res,
            {
                user: {
                    userId: newUser._id,
                    email: newUser.email,
                    username: username,
                    role: newUser.role,
                    oauth: newUser.oauth
                }
            },
            "REGISTER_SUCCESS",
            201,
        )

    } catch (error) {
        console.log(error);
        return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default registerUser;
