import multer from "multer";

const uploadImageMiddleware = multer({ storage: multer.diskStorage({}) })

export default uploadImageMiddleware;