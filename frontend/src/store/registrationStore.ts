"use client";

import { create } from "zustand";
import useAlertStore from "./useAlertStore";

interface RegistrationState {
    registrations: any[];

    fetchEventRegistrations: (eventId: string, status?: string) => Promise<void>;
    fetchMyRegistrations: () => Promise<void>;
    registerForEvent: (eventId: string) => Promise<void>;
    cancelRegistration: (id: string) => Promise<void>;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
    registrations: [],

    fetchEventRegistrations: async (eventId: string, status?: string) => {
        try {
            let url = `http://localhost:7777/api/registrations/event/${eventId}`;

            if (status && status !== "all") {
                url += `?status=${status}`;
            }

            const res = await fetch(url, {
                credentials: "include",
            });

            const data = await res.json();

            set({
                registrations: data.data || [],
            });

        } catch (error) {
            console.error(error);
        }
    },

    fetchMyRegistrations: async () => {
        try {
            const res = await fetch(
                "http://localhost:7777/api/registrations",
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            set({
                registrations: data.data || [],
            });

        } catch (error) {
            console.error(error);
        }
    },

    registerForEvent: async (eventId) => {
        const res = await fetch(
            "http://localhost:7777/api/registrations",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ eventId }),
            }
        );

        const data = await res.json();

        useAlertStore.getState().setAlert({
            status: true,
            message: data.message,
            severity: res.ok ? "success" : "warning",
        });
    },

    cancelRegistration: async (id) => {
        const res = await fetch(
            `http://localhost:7777/api/registrations/${id}/cancel`,
            {
                method: "PATCH",
                credentials: "include",
            }
        );

        const data = await res.json();

        useAlertStore.getState().setAlert({
            status: true,
            message: data.message,
            severity: res.ok ? "success" : "warning",
        });

        await get().fetchMyRegistrations();

    },
}));