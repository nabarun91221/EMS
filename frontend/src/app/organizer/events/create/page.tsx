"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
} from "@mui/material";

import { IconPlus } from "@tabler/icons-react";
import { useEventStore } from "@/store/eventStore";

export default function CreateEventPage() {
    const router = useRouter();
    const { createEvent } = useEventStore();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        time: "",
        price: 0,
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await createEvent(form);

        router.push("/organizer/events");
    };

    return (
        <Box p={3}>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Create Event
            </Typography>

            <Card>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {/* TITLE */}
                            <Grid size={12}>
                                <TextField
                                    label="Event Title"
                                    name="title"
                                    fullWidth
                                    required
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* DESCRIPTION */}
                            <Grid size={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* LOCATION */}
                            <Grid size={6}>
                                <TextField
                                    label="Location"
                                    name="location"
                                    fullWidth
                                    required
                                    value={form.location}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* TIME */}
                            <Grid size={6}>
                                <TextField
                                    label="Time"
                                    name="time"
                                    fullWidth
                                    required
                                    placeholder="10:00 AM"
                                    value={form.time}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* START DATE */}
                            <Grid size={6}>
                                <TextField
                                    type="date"
                                    label="Start Date"
                                    name="startDate"
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={form.startDate}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* END DATE */}
                            <Grid size={6}>
                                <TextField
                                    type="date"
                                    label="End Date"
                                    name="endDate"
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={form.endDate}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* PRICE */}
                            <Grid size={6}>
                                <TextField
                                    type="number"
                                    label="Ticket Price"
                                    name="price"
                                    fullWidth
                                    value={form.price}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* SUBMIT BUTTON */}
                            <Grid size={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<IconPlus size={18} />}
                                >
                                    Create Event
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}