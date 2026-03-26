import Registration from "../model/registration.model.js";
import Event from "../../event/models/event.model.js";

class RegistrationController
{
    registerForEvent = async (req, res) =>
    {
        try {
            const { eventId } = req.body;
            const userId = req.user?.sub || req.body.user;

            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found",
                });
            }

            const alreadyRegistered = await Registration.findOne({
                event: eventId,
                user: userId,
                attendanceStatus: "registered"
            });

            if (alreadyRegistered) {
                return res.status(400).json({
                    success: false,
                    message: "User already registered for this event",
                });
            }

            const registration = await Registration.create({
                event: eventId,
                user: userId,
            });

            res.status(201).json({
                success: true,
                message: "Registration successful",
                data: registration,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
    getAllRegistrations = async (req, res) =>
    {
        try {
            const registrations = await Registration.find()
                .populate("event", "title location startDate")
                .populate("user", "name email");

            res.status(200).json({
                success: true,
                data: registrations,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
    getEventRegistrations = async (req, res) =>
    {
        try {
            const { status } = req.query;

            const filter = {
                event: req.params.id,
            };

            if (status) {
                filter.attendanceStatus = status;
            }

            const registrations = await Registration.find(filter)
                .populate("user", "name email");

            res.status(200).json({
                success: true,
                count: registrations.length,
                data: registrations,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
    cancelRegistration = async (req, res) =>
    {
        try {
            const registration = await Registration.findByIdAndUpdate(
                req.params.id,
                { attendanceStatus: "cancelled" },
                { new: true }
            );

            if (!registration) {
                return res.status(404).json({
                    success: false,
                    message: "Registration not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Registration cancelled",
                data: registration,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}
export default new RegistrationController()
