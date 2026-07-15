const express = require('express');
const { getProjects } = require('../controllers/projects.controller');
const router = express.Router();


// On appel la fonction getPrijects pour créer la route API : 
router.get('/' ,getProjects);


// On oublie pas d'exporter le router (permet a require dimporter le router) : 
module.exports = router;

