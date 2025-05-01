const express = require('express');
const router = express.Router();
const { saveHistory, getHistory } = require('../controllers/historyController');

// POST /api/history/save
router.post('/save', saveHistory);

// GET /api/history/get
router.get('/get', getHistory);

module.exports = router;

