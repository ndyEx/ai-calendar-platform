const pool = require('../config/db.config');

const getAllEvents = async () => {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows;
};

const insertEvent = async (eventData) => {
    const { title, description, start_time, end_time, category } = eventData;
    const [result] = await pool.query(
        `INSERT INTO events (title, description, start_time, end_time, category)
         VALUES (?, ?, ?, ?, ?)`,
        [title, description || null, start_time, end_time, category || '일반']
    );
    return result.insertId;
};

module.exports = {
    getAllEvents,
    insertEvent
};
