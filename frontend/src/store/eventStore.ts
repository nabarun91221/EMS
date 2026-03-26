"use client";

import { create } from "zustand";
import useAlertStore from "./useAlertStore";

export interface Event {
    _id: string;
    title: string;
    description?: string;
    location: string;
    startDate: string;
    endDate: string;
    time: string;
    price: number;
    organizer?: string | any;
}

interface EventState {
    events: Event[];
    selectedEvent: Event | null;
    loading: boolean;

    fetchEvents: () => Promise<void>;
    fetchOrganizerEvents: () => Promise<void>;
    getEventById: (id: string) => Promise<void>;
    createEvent: (eventData: Partial<Event>) => Promise<void>;
    updateEvent: (id: string, eventData: Partial<Event>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
    events: [],
    selectedEvent: null,
    loading: false,

    fetchEvents: async () => {
        set({ loading: true });

        try {
            const res = await fetch("http://localhost:7777/api/events", {
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                set({
                    events: data.data || [],
                    loading: false,
                });
            } else {
                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "warning",
                });

                set({ loading: false });
            }
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    fetchOrganizerEvents: async () => {
        set({ loading: true });

        try {
            const res = await fetch(
                "http://localhost:7777/api/events/organizer",
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (res.ok) {
                set({
                    events: data.data || [],
                    loading: false,
                });
            } else {
                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "warning",
                });

                set({ loading: false });
            }
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    getEventById: async (id: string) => {
        set({ loading: true });

        try {
            const res = await fetch(
                `http://localhost:7777/api/events/${id}`,
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (res.ok) {
                set({
                    selectedEvent: data.data,
                    loading: false,
                });
            } else {
                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "warning",
                });

                set({ loading: false });
            }
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    createEvent: async (eventData) => {
        try {
            const res = await fetch("http://localhost:7777/api/events", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            const data = await res.json();

            if (res.ok) {
                set((state) => ({
                    events: [...state.events, data.data],
                }));

                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "success",
                });
            } else {
                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "warning",
                });
            }
        } catch (error) {
            console.error(error);
        }
    },

    updateEvent: async (id, eventData) => {
        try {
            const res = await fetch(
                `http://localhost:7777/api/events/${id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData),
                }
            );

            const data = await res.json();

            if (res.ok) {
                set((state) => ({
                    events: state.events.map((event) =>
                        event._id === id ? data.data : event
                    ),
                }));

                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "success",
                });
            } else {
                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "warning",
                });
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteEvent: async (id) => {
        try {
            const res = await fetch(
                `http://localhost:7777/api/events/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (res.ok) {
                set((state) => ({
                    events: state.events.filter((event) => event._id !== id),
                }));

                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "success",
                });
            } else {
                useAlertStore.getState().setAlert({
                    status: true,
                    message: data.message,
                    severity: "warning",
                });
            }
        } catch (error) {
            console.error(error);
        }
    },
}));