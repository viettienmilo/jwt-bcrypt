import bcrypt from 'bcrypt'
import crypto from 'crypto'
import User from '../models/User.js';
import { userRegisterSchema } from '../validations/authValidations.js';
import ActivationToken from '../models/ActivationToken.js';
import mailSender from './../configs/nodemailer.js';
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
        const user = await User.findOne({ email })
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
        // return res.status(201).json({ message: 'User registered successfully' });

        // prepare and send activation link
        const token = crypto.randomBytes(32).toString('hex');
        await ActivationToken.create({
            userId: newUser._id,
            token,
            expiresAt: Date.now() + 1000 * 60 * 60 * 24,
        });

        const mail = {
            from: process.env.SENDER_MAIL,
            to: newUser.email,
            subject: "Activate account ✔",
            html: `
                <p><i>Please click on following link to activate your account: </i><p>
                <a href="${process.env.CLIENT_URL}/user/activate?token=${token}">Click to Activate</a>
            `
        }

        await mailSender.sendMail(mail)
        return res.status(201).json({
            message: "Registration successful. Please check your email to activate your account."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default registerUser;