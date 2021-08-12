const express = require('express');
const router = express.Router();

// route GET entries
// desc  Test rout
// access Public

router.get('/', (req, res) => res.send('Entries route'));

module.exports = router;
