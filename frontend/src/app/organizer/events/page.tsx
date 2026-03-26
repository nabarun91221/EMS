"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from "@mui/material";

import {
    IconPlus,
    IconEdit,
    IconUsers,
} from "@tabler/icons-react";
import { useEventStore } from "@/store/eventStore";
export default function OrganizerEventsPage() {
    const { events, fetchOrganizerEvents, loading } = useEventStore();

    useEffect(() => {
        fetchOrganizerEvents();
    }, []);

    return (
        <Box p={3}>
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4" fontWeight={600}>
                    My Events
                </Typography>

                <Link href="/organizer/events/create">
                    <Button
                        variant="contained"
                        startIcon={<IconPlus size={18} />}
                    >
                        Create Event
                    </Button>
                </Link>
            </Box>

            {/* EVENTS TABLE */}
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event._id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.location}</TableCell>

                                    <TableCell>
                                        {new Date(event.startDate).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>{event.time}</TableCell>

                                    <TableCell>
                                        {event.price === 0 ? "Free" : `₹${event.price}`}
                                    </TableCell>

                                    <TableCell align="right">
                                        <Link href={`/organizer/events/${event._id}`}>
                                            <IconButton>
                                                <IconEdit size={18} />
                                            </IconButton>
                                        </Link>

                                        <Link
                                            href={`/organizer/events/${event._id}/attendees`}
                                        >
                                            <IconButton>
                                                <IconUsers size={18} />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {!loading && events.length === 0 && (
                        <Typography
                            textAlign="center"
                            color="text.secondary"
                            mt={4}
                        >
                            No events created yet.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}