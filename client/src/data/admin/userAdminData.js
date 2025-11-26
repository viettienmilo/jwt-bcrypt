import { userAPI } from '../../api/axiosInstance';

const userAdminData = {
    getAllTeachers: async () => {
        const res = await userAPI.get('admin/users/teachers'); //VITE_MAIN_API=http://localhost:3000/api/user/profile/teachers
        return res.data.teachers; // {id: --- , fullName: ---}
    },

    getAllUsers: async () => {
        const res = await userAPI.get('admin/users/users'); //VITE_MAIN_API=http://localhost:3000/api/user/profile/users
        return res.data.users;
    }
}

export default userAdminData;