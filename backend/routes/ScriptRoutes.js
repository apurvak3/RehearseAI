const express = require("express");
const Script = require("../models/Script");
const router = express.Router();

// Save script
router.post("/", async (req, res) => {
  const { userId, title, content } = req.body;

  try {
    const newScript = new Script({ userId, title, content });
    await newScript.save();
    res.status(201).json(newScript);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving script.");
  }
});

// Get all scripts
router.get("/", async (req, res) => {
  try {
    const scripts = await Script.find();
    res.json(scripts);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching scripts.");
  }
});

module.exports = router;
