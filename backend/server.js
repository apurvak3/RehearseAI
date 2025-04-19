const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/whisper', require('./routes/whisper'));
app.use('/api/history', require('./routes/history'));
app.use('/api/tts', require('./routes/tts'));


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
