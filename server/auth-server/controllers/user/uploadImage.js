import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';
import { ErrorResponse, SuccessResponse } from './../../utils/response.js';
import { ERROR } from './../../constants/errorCodes.js';

const uploadImage = async (req, res) => {
    try {
        const user = req.user;

        // upload images to cloudinary via multer middleware
        const uploadImage = await cloudinary.uploader.upload(
            req.file.path, {
            folder: 'profilePictures',
            public_id: user._id.toString(),
            overwrite: true,    // overwrite the old 
            invalidate: true,   // refresh CDN cache
            transformation: [
                { width: 200, height: 200, crop: "fill", gravity: "face" } // crop & fill
            ],
        });

        // remove local temp file
        fs.unlinkSync(req.file.path);

        // update user profile picture
        user.profilePicture = uploadImage.secure_url;
        await user.save();

        return SuccessResponse(
            res,
            {
                userId: user._id,
                profilePicture: user.profilePicture
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