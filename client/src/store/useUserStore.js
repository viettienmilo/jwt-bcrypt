/* 
    ZUSTAND STORE : STATE MANAGEMENT
*/

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
    persist((set) => ({         // persist keep user stay logged in when refreshing page
        accessToken: null,
        user: null,
        setAccessToken: (token) => set({ accessToken: token }),
        setUser: (user) => set({ user }),
        logout: () => set({ accessToken: null, user: null }),
    }),
        {
            name: "user-storage", // key in localStorage
        }
    ));