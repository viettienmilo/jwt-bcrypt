import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

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

        res.status(200).json({
            message: 'Image uploaded successfully',
            userId: user._id,
            profilePicture: user.profilePicture
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

export default uploadImage