const express = require('express');
const { getProjects, getProject, createProject} = require('../controllers/projects.controller');
const router = express.Router();
const auth = require('../middleware/auth');


// On appel la fonction getProjects pour créer la route API : 
router.get('/' ,getProjects);// Liste des projets
router.get('/:id' ,getProject); // détail d'un projet
router.post('/:id' , auth, createProject);// creation d'un projet





// On oublie pas d'exporter le router (permet a require dimporter le router) : 
module.exports = router;

