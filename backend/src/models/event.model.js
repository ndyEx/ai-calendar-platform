const pool = require('../config/db.config');

const getAllEvents = async () => {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows;
};

module.exports = {
    getAllEvents
};
