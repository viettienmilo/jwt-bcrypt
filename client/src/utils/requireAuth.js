import { useUserStore } from './../store/useUserStore.js';
import { redirect } from 'react-router';
// export default function requireAuth() {
//     const user = useUserStore.getState().user;
//     return Boolean(user);
// }

export default function requireAuth() {
    const user = useUserStore.getState().user;
    return Boolean(user);
}