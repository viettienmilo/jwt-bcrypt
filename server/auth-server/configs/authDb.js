import mongoose from "mongoose"

const connectAuthDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_AUTH_URI)
        console.log(`MongoDB for Authentication connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectAuthDB;