const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authcontroller');

router.post('/:role/register', register);
router.post('/:role/login', login);

module.exports = router;




