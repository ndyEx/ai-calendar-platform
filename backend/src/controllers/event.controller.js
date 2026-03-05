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

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, start_time, end_time, category } = req.body;

        if (!title || !start_time || !end_time) {
            return res.status(400).json({ error: "Missing required fields: title, start_time, end_time" });
        }

        const affectedRows = await eventModel.updateEvent(id, { title, description, start_time, end_time, category });
        
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent
};
