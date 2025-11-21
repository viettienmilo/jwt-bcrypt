import axios from "axios";

export default async function syncUserProfileToMainServer(data) {
    try {
        const response = await axios.post(
            `${process.env.MAIN_SERVER_URL}/internal/user/sync`,
            data,
            {
                headers: {
                    "x-internal-secret": process.env.INTERNAL_SECRET_KEY
                }
            }
        );
        return response.data;
    } catch (err) {
        console.error("❌ Failed to sync user profile:", err.response?.data || err);
        throw err;
    }
}