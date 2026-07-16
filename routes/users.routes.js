const express = require('express');
const { register, login } = require('../controllers/users.controller');
const router = express.Router();
const {body} = require('express-validator');


router.post('/' ,register); // inscription
router.post('/login' ,body('email').isEmail() ,login); // connexion


module.exports = router;