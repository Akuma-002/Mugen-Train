const User = require('../models/user');
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if(!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const  existingUser = await User.findOne({ email });   
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create({name, email, password, phone});
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
            },
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
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
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Stored password (hashed):", existingUser.password);

        if (!existingUser.password) {
            return res.status(500).json({ message: "Password missing in DB" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                role: existingUser.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = { signUp, login };
