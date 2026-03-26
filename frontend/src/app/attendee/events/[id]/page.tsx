"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";




import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    Divider,
} from "@mui/material";

import {
    IconCalendarEvent,
    IconMapPin,
    IconUser,
} from "@tabler/icons-react";

import { useEventStore } from "@/store/eventStore";
import { useRegistrationStore } from "@/store/registrationStore";

export default function EventDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const { selectedEvent, getEventById } = useEventStore();
    const { registerForEvent } = useRegistrationStore();

    useEffect(() => {
        if (eventId) {
            getEventById(eventId);
        }
    }, [eventId]);

    if (!selectedEvent) {
        return (
            <Box p={4}>
                <Typography>Loading event...</Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Card sx={{ maxWidth: 700, margin: "auto" }}>
                <CardContent>

                    {/* TITLE */}
                    <Typography variant="h4" mb={2}>
                        {selectedEvent.title}
                    </Typography>

                    {/* DESCRIPTION */}
                    <Typography color="text.secondary" mb={3}>
                        {selectedEvent.description}
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={2}>

                        <Typography display="flex" gap={1}>
                            <IconMapPin size={18} />
                            {selectedEvent.location}
                        </Typography>

                        <Typography display="flex" gap={1}>
                            <IconCalendarEvent size={18} />
                            {new Date(selectedEvent.startDate).toLocaleDateString()} •{" "}
                            {selectedEvent.time}
                        </Typography>

                        <Typography display="flex" gap={1}>
                            <IconUser size={18} />
                            Organizer: {selectedEvent.organizer?.name || "Unknown"}
                        </Typography>

                        <Typography fontWeight={600}>
                            {selectedEvent.price === 0
                                ? "Free Event"
                                : `Ticket Price: ₹${selectedEvent.price}`}
                        </Typography>

                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* REGISTER BUTTON */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={async () => {
                            await registerForEvent(eventId)
                            router.push("/attendee/registrations");
                        }}
                    >
                        Register for Event
                    </Button>

                </CardContent>
            </Card>
        </Box>
    );
}