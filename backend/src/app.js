const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/event.routes');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/events', eventRoutes);

module.exports = app;
