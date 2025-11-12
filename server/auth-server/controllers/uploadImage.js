import { v2 as cloudinary } from 'cloudinary'
import User from '../models/User.js'

const uploadImage = async () => {

    const header = req.headers['authorization'];
    const accessToken = header.split(' ')[1];

    // check if accessToken valid
    if (!accessToken) {
        return res.status(401).json({ message: 'No accessToken provided' });
    }

    try {
        // verify user
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        const userId = decode.userId;

        // if user found, return all info EXCEPT password
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // upload images to cloudinary via multer middleware
        const uploadImages = req.files.map(
            async (file) => {
                const response = await cloudinary.uploader.upload(file.path)
                return response.secure_url;
            }
        )
        // wait for all images upload completed
        const images = await Promise.all(uploadImages);

        // update user profile picture
        user.profilePicture = images[0];
        await user.save();

        res.status(200).json({
            message: 'Image uploaded successfully',
            userId: user._id,
            profilePicture: user.profilePicture
        })

    } catch (error) {
        res.status(403).json({ message: error.message })
    }
}

export default uploadImage