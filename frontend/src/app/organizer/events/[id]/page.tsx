"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ConfirmDialog from "@/components/ConfirmDialog";

import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
} from "@mui/material";

import {
    IconDeviceFloppy,
    IconTrash,
    IconUsers,
} from "@tabler/icons-react";

import Link from "next/link";
import { useEventStore } from "@/store/eventStore";

export default function EventDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    const { selectedEvent, getEventById, updateEvent, deleteEvent } =
        useEventStore();

    const [form, setForm] = useState<any>(null);

    useEffect(() => {
        getEventById(eventId);
    }, [eventId]);

    useEffect(() => {
        if (selectedEvent) {
            setForm(selectedEvent);
        }
    }, [selectedEvent]);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e: any) => {
        e.preventDefault();

        await updateEvent(eventId, form);

        router.refresh();
    };

    const [openDelete, setOpenDelete] = useState(false);

    const handleDelete = async () => {
        await deleteEvent(eventId);
        setOpenDelete(false);
        router.push("/organizer/events");
    };

    if (!form) return <Typography>Loading...</Typography>;

    return (
        <Box p={3}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">Edit Event</Typography>

                <Link href={`/organizer/events/${eventId}/attendees`}>
                    <IconButton>
                        <IconUsers size={22} />
                    </IconButton>
                </Link>
            </Box>

            <Card>
                <CardContent>
                    <Box component="form" onSubmit={handleUpdate}>
                        <Grid container spacing={3}>


                            <Grid size={12}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={6}>
                                <TextField
                                    label="Location"
                                    name="location"
                                    fullWidth
                                    value={form.location}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={6}>
                                <TextField
                                    label="Time"
                                    name="time"
                                    fullWidth
                                    value={form.time}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={6}>
                                <TextField
                                    type="date"
                                    name="startDate"
                                    label="Start Date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={form.startDate?.split("T")[0]}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={6}>
                                <TextField
                                    type="date"
                                    name="endDate"
                                    label="End Date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={form.endDate?.split("T")[0]}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={6}>
                                <TextField
                                    type="number"
                                    label="Price"
                                    name="price"
                                    fullWidth
                                    value={form.price}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid size={12} display="flex" gap={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<IconDeviceFloppy />}
                                >
                                    Update Event
                                </Button>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => setOpenDelete(true)}
                                >
                                    Delete Event
                                </Button>

                                <ConfirmDialog
                                    open={openDelete}
                                    title="Delete Event"
                                    description="Are you sure you want to delete this event?"
                                    onClose={() => setOpenDelete(false)}
                                    onConfirm={handleDelete}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}