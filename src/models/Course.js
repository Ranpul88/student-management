import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
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
    },
    availability: {
        type: Boolean,
        required: true,
    }
})

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course