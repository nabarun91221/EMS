"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Stack,
} from "@mui/material";

import { IconSearch } from "@tabler/icons-react";
import { useEventStore } from "@/store/eventStore";
export default function AttendeeEventsPage() {
    const { events } = useEventStore();

    const [filters, setFilters] = useState({
        search: "",
        location: "",
        minPrice: "",
        maxPrice: "",
        startDate: "",
    });

    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(() => {
        applyFilters();
    }, [events]);

    const handleChange = (e: any) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = async () => {
        const query = new URLSearchParams(filters as any).toString();

        const res = await fetch(
            `http://localhost:7777/api/events?${query}`,
            {
                credentials: "include",
            }
        );

        const data = await res.json();

        setFilteredEvents(data.data || []);
    };

    const resetFilters = async () => {
        setFilters({
            search: "",
            location: "",
            minPrice: "",
            maxPrice: "",
            startDate: "",
        });

        const res = await fetch("http://localhost:7777/api/events", {
            credentials: "include",
        });

        const data = await res.json();
        setFilteredEvents(data.data || []);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>
                Browse Events
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">

                        <Grid size={3}>
                            <TextField
                                fullWidth
                                label="Search"
                                name="search"
                                value={filters.search}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <IconSearch size={18} />,
                                }}
                            />
                        </Grid>

                        <Grid size={2}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={filters.location}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={2}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Min Price"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={2}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Max Price"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={2}>
                            <TextField
                                fullWidth
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleChange}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Grid>

                        <Grid size={2}>
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    onClick={applyFilters}
                                >
                                    Filter
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </Button>
                            </Stack>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

            <Grid container spacing={3}>
                {filteredEvents?.map((event) => (
                    <Grid key={event._id} size={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {event.title}
                                </Typography>

                                <Typography color="text.secondary">
                                    {event.location}
                                </Typography>

                                <Typography>
                                    {new Date(event.startDate).toLocaleDateString()} •{" "}
                                    {event.time}
                                </Typography>

                                <Typography mt={1}>
                                    {event.price === 0
                                        ? "Free"
                                        : `₹${event.price}`}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Link href={`/attendee/events/${event._id}`}>
                                    <Button variant="contained" size="small">
                                        View Event
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {filteredEvents.length === 0 && (
                <Typography textAlign="center" mt={5}>
                    No events found
                </Typography>
            )}
        </Box>
    );
}