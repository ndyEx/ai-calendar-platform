const eventModel = require('../models/event.model');

const getEvents = async (req, res) => {
    try {
        const events = await eventModel.getAllEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEvents
};
