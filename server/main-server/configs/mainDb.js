import mongoose from "mongoose"

const mainDb = mongoose.createConnection(process.env.MONGO_MAIN_URI);

mainDb.on('connected', () => console.log('Connected to Main DB'))
export default mainDb;