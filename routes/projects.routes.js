const express = require('express');
const { getProjects, getProject, createProject} = require('../controllers/projects.controller');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');


// On appel la fonction getProjects pour créer la route API : 
router.get('/' ,getProjects);// Liste des projets
router.get('/:id' ,getProject); // détail d'un projet
router.post('/:id' , auth, upload.single('image'), createProject); // creation d'un projet --- upload.single('image') => on met image car c'est comme cela qu'on l'a appler dans le ficher projects.controller.js ligne 54 "const {title, description, skills, image } = req.body;"





// On oublie pas d'exporter le router (permet a require dimporter le router) : 
module.exports = router;

