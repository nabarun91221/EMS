"use client";

import { create } from "zustand";

type Severity = "success" | "error" | "warning" | "info";

interface Alert {
    status: boolean;
    message: string;
    severity: Severity;
}

interface AlertState {
    alert: Alert | null;
    setAlert: (alert: Alert) => void;
    clearAlert: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
    alert: null,

    setAlert: (alert) => set({ alert }),

    clearAlert: () => set({ alert: null }),
}));

export default useAlertStore;