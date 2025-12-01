import { userAPI } from './../api/axiosInstance.js';

export const getCoursesForEnrollment = async () => {
    const data = await userAPI.get('/student/courses-to-enroll');
    return data.data.items;
}

export const saveEnrollment = async (data) => {
    const result = await userAPI.post('/student/enroll', data);
    return result.data;
}