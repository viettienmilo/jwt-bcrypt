// All API endpoints

export const AUTH = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ACTIVATE: "/auth/activate",
    SEND_ACTIVATION_LINK: "/auth/send-activation-link",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
};

export const USER = {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/update",
};

// export const CLASS = {
//     GET_CLASSES: "/classes",
//     CREATE_CLASS: "/classes/create",
//     GET_CLASS_DETAIL: (id) => `/classes/${id}`,
//     MARK_ATTENDANCE: (classId) => `/classes/${classId}/attendance`,
// };