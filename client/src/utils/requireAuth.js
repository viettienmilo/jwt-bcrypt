import { useUserStore } from './../store/useUserStore.js';

export default function requireAuth() {
    const user = useUserStore.getState().user;

    return Boolean(user);
}