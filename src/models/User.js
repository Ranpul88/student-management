import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userID:{
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "lecturer", "admin"],
        default: "student",
    },
    coursesTeaching: {
        type: [String],
        default: []
    },
    coursesEnrolled:{
        type: [String],
        default: []
    }
},
    { timestamps: true }
);

const Users = mongoose.models.User || mongoose.model("User", userSchema);

export default Users