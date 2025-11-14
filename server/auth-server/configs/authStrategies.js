import GoogleStrategy from 'passport-google-oauth2'
import FacebookStrategy from 'passport-facebook'
import GithubStrategy from 'passport-github'
import User from './../models/User.js';

// callback handler for all of providers (Google, Facebook,...)
async function handleOAuthCallback(profile, provider, done) {
    try {
        // got name and email from profile (provided from provider)
        const name = profile.displayName;
        const email = profile.emails?.[0]?.value || `${profile.username || profile.id}@github.local`;
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
            callbackURL: process.env.GOOGLE_CALLBACK_URI,
        },
            async (accessToken, refreshToken, profile, done) => {
                await handleOAuthCallback(profile, 'google', done);
            }
        )
    );

    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URI,
            profileFields: ['id', 'displayName', 'emails', 'photos'],
        },
            async (accessToken, refreshToken, profile, done) => {
                await handleOAuthCallback(profile, 'facebook', done);
            }
        )
    );

    passport.use(
        new GithubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URI,
        },
            async (accessToken, refreshToken, profile, done) => {
                await handleOAuthCallback(profile, 'github', done);
            }
        )
    )
};

export default passportConfig;