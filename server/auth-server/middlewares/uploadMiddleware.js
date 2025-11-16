import multer from "multer";

const imageUploadMiddleware = multer({ storage: multer.diskStorage({}) })

export { imageUploadMiddleware };