/* 
    ZUSTAND STORE : STATE MANAGEMENT
*/

import { create } from "zustand";
import { persist } from "zustand/middleware";

// handle authentication
export const useUserStore = create(
    persist((set) => ({         // persist keep user stay logged in when refreshing page
        accessToken: null,
        user: null,
        role: null,
        setAccessToken: (token) => set({ accessToken: token }),
        setUser: (user) => set({ user }),
        setRole: (role) => set({ role }),
        logout: () => set({ accessToken: null, user: null, role: null }),
    }),
        {
            name: "user-storage", // key in localStorage
        }
    )
);

// handle UI
export const useUIStore = create((set) => ({
    showNavbar: true,
    setShowNavbar: (value) => set({ showNavbar: value }),
    dashboardSideMenuItem: null,
    setDashboardSideMenuItem: (item) => set({ dashboardSideMenuItem: item }),
}));