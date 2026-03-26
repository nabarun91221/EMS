"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Chip,
    Stack,
} from "@mui/material";

import { useRegistrationStore } from "@/store/registrationStore";

import ConfirmDialog from "@/components/ConfirmDialog";

export default function MyEventsPage() {
    const router = useRouter();

    const {
        registrations,
        fetchMyRegistrations,
        cancelRegistration,
    } = useRegistrationStore();

    useEffect(() => {
        fetchMyRegistrations();
    }, []);

    const getStatusColor = (status: string) => {
        if (status === "registered") return "success";
        if (status === "cancelled") return "error";
        return "default";
    };
    const [selectedRegistration, setSelectedRegistration] =
        useState<string | null>(null);

    const handleCancelConfirm = async () => {
        if (!selectedRegistration) return;
        await cancelRegistration(selectedRegistration);
        setSelectedRegistration(null);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={4} fontWeight={600}>
                My Registered Events
            </Typography>

            <Grid container spacing={3}>
                {registrations.map((reg) => (
                    <Grid key={reg._id} size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer",
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                            onClick={() =>
                                router.push(`/attendee/events/${reg.event?._id}`)
                            }
                        >
                            <CardContent sx={{ flexGrow: 1 }}>

                                <Stack spacing={1}>

                                    <Typography variant="h6" fontWeight={600}>
                                        {reg.event?.title}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {reg.event?.location}
                                    </Typography>

                                    <Typography fontSize={14}>
                                        {new Date(reg.event?.startDate).toLocaleDateString()} •{" "}
                                        {reg.event?.time}
                                    </Typography>

                                    <Chip
                                        label={reg.attendanceStatus}
                                        color={getStatusColor(reg.attendanceStatus)}
                                        size="small"
                                        sx={{ width: "fit-content", mt: 1 }}
                                    />

                                </Stack>
                            </CardContent>

                            <Box
                                sx={{
                                    p: 2,
                                    minHeight: 70,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {reg.attendanceStatus === "registered" && (
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedRegistration(reg._id);
                                        }}
                                    >
                                        Cancel Registration
                                    </Button>
                                )}



                            </Box>
                        </Card>
                    </Grid>
                ))}
                <ConfirmDialog
                    open={Boolean(selectedRegistration)}
                    title="Cancel Registration"
                    description="Do you really want to cancel this event registration?"
                    onClose={() => setSelectedRegistration(null)}
                    onConfirm={handleCancelConfirm}
                />
            </Grid>

            {registrations.length === 0 && (
                <Typography textAlign="center" mt={6} color="text.secondary">
                    You have not registered for any events.
                </Typography>
            )}
        </Box>
    );
}