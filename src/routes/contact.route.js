const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Route for identifyng the contact
router.post('/identify', contactController.identifyContact);


module.exports = router;