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
    //Aadhar Number
    aadhar: {
        type: String,   
        required: true,
        unique: true,
        match: [/^\d{12}$/, "Please provide a valid 12-digit Aadhar number"],
    },
    // Address
    address: {
        type: String,
        default: "",
        trim: true,
    },
    //Pin Code
    pinCode: {
        type: String,
        default: "",
        trim: true,
    },
    //Region
    region: {
        type: String,
        default: "India",
        trim: true,
    },
    //State
    state: {
        type: String,
        default: "",
        trim: true,
    },
    //City
    city: {
        type: String,
        default: "",
        trim: true,
    },
    //District
    district: {
        type: String,
        default: "",
        trim: true,
    },
    //Date of Birth
    dob: {
        type: Date,
    },
    //document verification
    document: {
        type: String,
        default: "",
        trim: true,
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
            //auto generated ticket number
            ticketNumber: { type: String, required: true, unique: true },
            trainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train", required: true },
            trainName: { type: String, required: true },
            trainNumber: { type: String, required: true },
            bookingDate: { type: Date, default: Date.now },
            travelDate: { type: Date, required: true },
            origin: { type: String, required: true },
            originStation: { type: String, required: true },
            destinationStation: { type: String, required: true },
            time: { type: String, required: true },
            
            seatNumbers: [String], // Example: ["A1", "A2"]
            class: {
                type: String,
                enum: ["sleeper", "3AC", "2AC", "1AC"],
                required: true,
            },
            totalFare: {
                type: Number,
                required: true,
            },
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


