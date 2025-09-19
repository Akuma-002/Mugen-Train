const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');




dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        app.use("/api/users", userRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    } 
};

startServer();
