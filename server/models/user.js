const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    // Basic Info
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, 
    },

    // Contact Details
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },

    // Role 
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    // Booking History 
    bookings: [
        {
            trainId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Train",
            },
            bookingDate: { type: Date, default: Date.now },
            seatNumbers: [String], // Example: ["A1", "A2"]
            status: {
                type: String,
            enum: ["booked", "cancelled", "completed"],
            default: "booked",
            },
        },
    ],

    // Wallet / Points 
    walletBalance: {
        type: Number,
        default: 0,
    },
},
{ timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;


