import multer from "multer";

const uploadImage = multer({ storage: multer.diskStorage({}) })

export default uploadImage;