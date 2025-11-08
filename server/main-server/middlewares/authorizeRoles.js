const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        // validate user
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // verify roles if allowed
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }

        // if everything fine, go next
        next();
    }
}

export default authorizeRoles;