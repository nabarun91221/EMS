"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: "ATTENDEE" | "ORGANIZER";
}

interface UserState {
    user: User | null;
    users: User[];
    setUser: (user: User | null) => void;
    setUsers: (users: User[]) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            users: [],

            setUser: (user) =>
                set({
                    user,
                }),

            setUsers: (users) =>
                set({
                    users,
                }),

            clearUser: () =>
                set({
                    user: null,
                }),
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);

export default useUserStore;