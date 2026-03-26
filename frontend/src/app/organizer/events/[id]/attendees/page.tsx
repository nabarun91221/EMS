"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from "@mui/material";

import { useRegistrationStore } from "@/store/registrationStore";

export default function EventAttendeesPage() {
    const params = useParams();
    const eventId = params.id as string;

    const { registrations, fetchEventRegistrations } =
        useRegistrationStore();

    const [status, setStatus] = useState("all");

    useEffect(() => {
        if (eventId) {
            fetchEventRegistrations(eventId, status);
        }
    }, [eventId, status]);

    return (
        <Box p={3}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">
                    Event Attendees
                </Typography>

                {/* FILTER DROPDOWN */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Status</InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="registered">
                            Registered
                        </MenuItem>
                        <MenuItem value="attended">
                            Attended
                        </MenuItem>
                        <MenuItem value="cancelled">
                            Cancelled
                        </MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Registered At</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {registrations.map((reg: any) => (
                                <TableRow key={reg._id}>
                                    <TableCell>{reg.user?.name}</TableCell>

                                    <TableCell>{reg.user?.email}</TableCell>

                                    <TableCell>
                                        {new Date(
                                            reg.registrationDate
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={reg.attendanceStatus}
                                            color={
                                                reg.attendanceStatus === "attended"
                                                    ? "success"
                                                    : reg.attendanceStatus ===
                                                        "cancelled"
                                                        ? "error"
                                                        : "primary"
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {registrations.length === 0 && (
                        <Typography textAlign="center" mt={4}>
                            No attendees found.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}