import { userAPI } from './../api/axiosInstance.js';

const userData = {
    getAllTeachers: async () => {
        const res = await userAPI.get('user/profile/teachers'); //VITE_MAIN_API=http://localhost:3000/api/user/profile/teachers
        return res.data.teachers; // {id: --- , fullName: ---}
    }
}

export default userData;