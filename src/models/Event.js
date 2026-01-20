import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)

export default Event