import GoogleStrategy from 'passport-google-oauth2'
import User from './../models/User.js';

// callback handler for all of providers (Google, Facebook,...)
async function handleOAuthCallback(profile, provider, done) {
    try {
        // got name and email from profile (provided from provider)
        const name = profile.displayName;
        const email = profile.emails?.[0]?.value;
        const image = profile.photos?.[0]?.value;

        // check user is existed
        // if existed, just move forward
        // if not, create the new one in database
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                username: name,
                email: email,
                profilePicture: image,
                oauth: { provider: provider, providerId: profile.id },
            })
        } else if (!user.oauth?.providerId) {
            // Update oauth info if missing
            user.oauth = { provider, providerId: profile.id };
            user.profilePicture ||= image;
            await user.save();
        }
        return done(null, user);

    } catch (error) {
        console.error('OAuth error:', error);
        done(error, null);
    }
}

// create new Google strategy
function passportConfig(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/api/auth/login/google/callback',
        },
            async (accessToken, refreshToken, profile, done) => {
                await handleOAuthCallback(profile, 'google', done);
            }
        ))
};

export default passportConfig;