import TimeTable from "@/app/admin/time-table/page";
import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema({
    eventTitle: {
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

const TimeTable = mongoose.model('timeTable', timeTableSchema)

export default TimeTable