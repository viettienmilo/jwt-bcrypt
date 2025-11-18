export default function normalizeOAuthUser(provider, profile) {
    switch (provider) {
        case 'google':
            return {
                email: profile.emails?.[0]?.value,
                username: profile.displayName?.replace(/\s+/g, '') || `user${Date.now()}`,
                firstname: profile.name?.givenName || '',
                lastname: profile.name?.familyName || '',
                avatarUrl: profile.photos?.[0]?.value || ''
            };
        case 'facebook':
            return {
                email: profile.emails?.[0]?.value,
                // username: `${profile.first_name}${profile.last_name}` || `user${Date.now()}`,
                // firstname: profile.first_name || '',
                // lastname: profile.last_name || '',
                // avatarUrl: profile.picture?.data?.url || ''
                username: profile.displayName || `user${Date.now()}`,
                firstname: profile.first_name || '',
                lastname: profile.last_name || '',
                avatarUrl: profile.photos?.[0]?.value || '',
            };
        case 'github':
            return {
                email: profile.emails?.[0]?.value,
                username: profile.username || `user${Date.now()}`,
                firstname: '',
                lastname: '',
                avatarUrl: profile._json?.avatar_url || ''
            };
        default:
            return {
                email: profile.emails?.[0]?.value,
                username: `user${Date.now()}`,
                firstname: '',
                lastname: '',
                avatarUrl: ''
            };
    }
}