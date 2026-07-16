const express = require('express');
const { getProjects, getProject, createProject} = require('../controllers/projects.controller');
const router = express.Router();


// On appel la fonction getProjects pour créer la route API : 
router.get('/' ,getProjects);// Liste des projets
router.get('/:id' ,getProject); // détail d'un projet
router.get('/:id' ,createProject);// creation d'un projet





// On oublie pas d'exporter le router (permet a require dimporter le router) : 
module.exports = router;

