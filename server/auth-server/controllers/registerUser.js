import bcrypt from 'bcrypt'
import User from '../models/User.js';
import { userRegisterSchema } from '../validations/authValidations.js';

/* 
1. REGISTER USER
    - check if user exists
    - if not, hash password
    - save user to database
    - send response
*/

const registerUser = async (req, res) => {
    try {
        // first, validate input
        const { error, value } = userRegisterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { username, password, email } = value;

        // then check if user exists
        const user = await User.findOne({ username })
        if (user) {
            return res.status(403).json({ message: 'User already exists' })
        }

        // if new user, hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // save new user to database
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default registerUser;