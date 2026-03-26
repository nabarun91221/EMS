import Event from "../models/event.model.js";


class EventController
{
    createEvent = async (req, res) =>
    {
        try {
            const { startDate, endDate, time } = req.body;


            const overlappingEvent = await Event.findOne({
                startDate: { $lte: new Date(endDate) },
                endDate: { $gte: new Date(startDate) },
                time: time,
            });

            if (overlappingEvent) {
                return res.status(400).json({
                    success: false,
                    message: "Another event already exists at this time.",
                });
            }

            const event = await Event.create({
                ...req.body,
                organizer: req.user.sub,
            });

            res.status(201).json({
                success: true,
                message: "Event created successfully",
                data: event,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    getAllEvents = async (req, res) =>
    {
        try {
            const { location, startDate, endDate, minPrice, maxPrice, search } =
                req.query;

            const filter = {};

            if (location) {
                filter.location = { $regex: location, $options: "i" };
            }

            if (startDate || endDate) {
                filter.startDate = {};
                if (startDate) filter.startDate.$gte = new Date(startDate);
                if (endDate) filter.startDate.$lte = new Date(endDate);
            }

            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }

            if (search) {
                filter.title = { $regex: search, $options: "i" };
            }

            const events = await Event.find(filter)
                .populate("organizer", "name email")
                .sort({ startDate: 1 });

            res.status(200).json({
                success: true,
                count: events.length,
                data: events,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
    getOrganizerEvents = async (req, res) =>
    {
        try {
            const events = await Event.find({ organizer: req.user.sub }).populate("organizer", "name email");

            res.status(200).json({
                success: true,
                data: events,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }


    getEventById = async (req, res) =>
    {
        try {
            const event = await Event.findById(req.params.id).populate(
                "organizer",
                "name email"
            );

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found",
                });
            }

            res.status(200).json({
                success: true,
                data: event,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    updateEvent = async (req, res) =>
    {
        try {
            const eventId = req.params.id;

            const existingEvent = await Event.findById(eventId);

            if (!existingEvent) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found",
                });
            }

            const startDate = req.body.startDate || existingEvent.startDate;
            const endDate = req.body.endDate || existingEvent.endDate;
            const time = req.body.time || existingEvent.time;

            const overlappingEvent = await Event.findOne({
                _id: { $ne: eventId },
                organizer: req.user.sub,
                startDate: { $lte: new Date(endDate) },
                endDate: { $gte: new Date(startDate) },
                time: time,
            });

            if (overlappingEvent) {
                return res.status(400).json({
                    success: false,
                    message: `Conflict with event "${overlappingEvent.title}"`,
                });
            }

            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            res.status(200).json({
                success: true,
                message: "Event updated successfully",
                data: updatedEvent,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    deleteEvent = async (req, res) =>
    {
        try {
            const event = await Event.findByIdAndDelete(req.params.id);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Event deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}
export default new EventController();
