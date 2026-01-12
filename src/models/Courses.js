import mongoose from "mongoose"

const coursesSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    mode: {
        type: [String],
        required: true,
    },
    delivery: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    programOverView: {
        type: [String],
        required: true,
    },
    entryRequirements: {
        type: [String],
        required: true,
    },
    intakes: {
        type: [String],
        required: true,
    },
    nextIntake: {
        day: {
            type: Number,
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        }
    }
})

const Courses = mongoose.models.Courses || mongoose.model('Course', coursesSchema);

export default Courses