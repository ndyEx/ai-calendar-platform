const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// Initialize table if it doesn't exist
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                start_time DATETIME NOT NULL,
                end_time DATETIME NOT NULL,
                category VARCHAR(50) DEFAULT '일반',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_start_time (start_time),
                INDEX idx_category (category)
            )
        `);
        console.log('Database table `events` initialized successfully.');
    } catch (err) {
        console.error('Failed to initialize database table:', err);
    }
};

initDB();

module.exports = pool;
