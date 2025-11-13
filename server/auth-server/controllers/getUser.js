
const getUser = async (req, res) => {
    try {
        const user = req.user

        // send user back to client
        res.status(200).json({
            message: 'User authorized',
            user: {
                useId: user._id,
                ...user.toObject(),
            }
        });

    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUser;