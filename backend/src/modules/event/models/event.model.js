import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
        },

        location: {
            type: String,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Event", eventSchema);