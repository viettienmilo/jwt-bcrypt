import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';
import { ErrorResponse, SuccessResponse } from './../../utils/response.js';
import { ERROR } from './../../constants/errorCodes.js';
import UserProfile from './../../models/UserProfile.js';

const uploadImage = async (req, res) => {
    try {
        const { userId } = req.user;
        const userProfile = await UserProfile.findById(userId);

        // upload images to cloudinary via multer middleware
        const uploadImage = await cloudinary.uploader.upload(
            req.file.path, {
            folder: 'avatarImages',
            public_id: userProfile._id.toString(),
            overwrite: true,    // overwrite the old 
            invalidate: true,   // refresh CDN cache
            transformation: [
                { width: 200, height: 200, crop: "fill", gravity: "face" } // crop & fill
            ],
        });

        // remove local temp file
        fs.unlinkSync(req.file.path);

        // update user profile picture
        userProfile.avatarUrl = uploadImage.secure_url;
        await userProfile.save();

        return SuccessResponse(
            res,
            {
                userId: userProfile._id,
                avatarUrl: userProfile.avatarUrl
            },
            "UPLOAD_SUCCESS",
            200
        )

    } catch (error) {
        console.log(error.message)
        return ErrorResponse(res, ERROR.SERVER_ERROR, 500);
    }
}

export default uploadImage