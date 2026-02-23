const eventModel = require('../models/event.model');

const getEvents = async (req, res) => {
    try {
        const events = await eventModel.getAllEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, description, start_time, end_time, category } = req.body;

        if (!title || !start_time || !end_time) {
            return res.status(400).json({ error: "Missing required fields: title, start_time, end_time" });
        }

        const insertId = await eventModel.insertEvent({ title, description, start_time, end_time, category });
        res.status(201).json({ message: "Event created successfully", id: insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEvents,
    createEvent
};
