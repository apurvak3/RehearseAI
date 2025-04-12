const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const scriptRoutes = require("./routes/scriptRoutes");
const ttsRoutes = require("./routes/ttsRoutes");
const sttRoutes = require("./routes/sttRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/scripts", scriptRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/stt", sttRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

