import mongoose from "mongoose"

const authDb = mongoose.createConnection(process.env.MONGO_AUTH_URI);

authDb.on('connected', () => console.log('Connected to AuthUsers DB'));

export default authDb;