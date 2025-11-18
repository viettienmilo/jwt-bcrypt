import GoogleStrategy from 'passport-google-oauth2'
import FacebookStrategy from 'passport-facebook'
import { Strategy as GithubStrategy } from 'passport-github2'
import AuthUser from './../models/AuthUser.js';
import normalizeOAuthUser from './../utils/normalizeOAuthUser.js';
import { generateRefreshToken } from './../tokens/generateTokens.js';


// callback handler for all of providers (Google, Facebook,...)
async function handleOAuthCallback(profile, provider, done) {
    try {
        // info from profile (provided from provider)
        const email = profile.emails?.[0]?.value || `${profile.username || profile.id}@github.local`;

        let user = await AuthUser.findOne({ email });
        if (!user) {
            user = await AuthUser.create({
                email: email,
                isVerified: true,
                oauth: { provider: provider, providerId: profile.id },
            })
        }
        else if (!user.oauth || user.oauth.provider !== provider) {
            user.oauth = { provider, providerId: profile.id };
            user.isVerified = true;
            await user.save();
        }

        const normalized = normalizeOAuthUser(provider, profile);

        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        user.refreshTokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();

        return done(null, { user, normalized, refreshToken });

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
            scope: ["user:email"],
        },
            async (accessToken, refreshToken, profile, done) => {
                await handleOAuthCallback(profile, 'github', done);
                // console.log("PROFILE:", profile);
                // console.log("EMAILS:", profile.emails);
            }
        )
    )
};

export default passportConfig;