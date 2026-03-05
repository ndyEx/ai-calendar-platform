const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);

module.exports = router;
