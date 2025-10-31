const User = require('../models/user');
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {
  try {
    console.log('SignUp request body:', req.body);
    const { name, email, password, phone, aadhar } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password before creating user

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      bookings: [], // ensure new users start with null bookings
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        bookings: newUser.bookings ?? null,
      },
    });
  } catch (error) {
    // Better error responses and logging
    console.error('SignUp error:', error && error.stack ? error.stack : error);

    // Duplicate key (unique index) error
    if (error && error.code === 11000) {
      const key = Object.keys(error.keyValue || {})[0] || 'field';
      return res.status(409).json({ message: `Duplicate value for ${key}` });
    }

    if (error && error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Incoming email:", email);
        console.log("Incoming password:", password);

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
          console.log("No user found with email:", email);
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Stored password (hashed):", existingUser.password);
        console.log("Comparing with password:", password);
        if (!existingUser.password) {
            return res.status(500).json({ message: "Password missing in DB" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        console.log("Password match result:", isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Sign a JWT token
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                role: existingUser.role,
                address: existingUser.address,
                state: existingUser.state,
                district: existingUser.district,
                city: existingUser.city,
                pinCode: existingUser.pinCode,
                dob: existingUser.dob,
                aadhar: existingUser.aadhar,
                bookings: existingUser.bookings,
                walletBalance: existingUser.walletBalance
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




// Update user details
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Optional: Prevent password update here, or hash if present
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role,
                address: updatedUser.address,
                state: updatedUser.state,
                district: updatedUser.district,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelBooking = async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }
    if (!ticketNumber) {
      return res.status(400).json({ message: "Ticket number is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.bookings || !Array.isArray(user.bookings)) {
      return res.status(500).json({ message: "User bookings data invalid" });
    }

    // Find booking by exact ticketNumber match (consider case sensitivity as per your app needs)
    const booking = user.bookings.find(b => b.ticketNumber === ticketNumber);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if booking is already cancelled or completed to avoid redundant updates
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }
    if (booking.status === "completed") {
      return res.status(400).json({ message: "Cannot cancel a completed booking" });
    }

    booking.status = "cancelled";
    await user.save();

    return res.json({
      message: "Booking cancelled successfully",
      updatedBookings: user.bookings,
    });
  } catch (err) {
    console.error("Cancel booking error:", err.message, err.stack);
    return res.status(500).json({ message: "Server error - " + err.message });
  }
};


module.exports = { signUp, login, updateUser, cancelBooking };
