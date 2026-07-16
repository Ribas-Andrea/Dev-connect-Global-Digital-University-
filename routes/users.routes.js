const express = require('express');
const { register, login } = require('../controllers/users.controller');
const router = express.Router();


router.post('/' ,register); // inscription
router.post('/login' ,login); // connexion


module.exports = router;