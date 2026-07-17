const express = require('express');
const { getProjects, getProject, createProject, updateProject, deleteProject, likeProject, commentProject} = require('../controllers/projects.controller');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');


// On appel la fonction getProjects pour créer la route API : 
router.get('/' ,getProjects);// Liste des projets
router.get('/:id' ,getProject); // détail d'un projet
router.post('/' , auth, upload.single('image'), createProject); // creation d'un projet --- upload.single('image') => on met image car c'est comme cela qu'on l'a appler dans le ficher projects.controller.js ligne 54 "const {title, description, skills, image } = req.body;"
router.put('/:id', auth, upload.single('image'), updateProject); // modification d'un projet
router.delete('/:id', auth, deleteProject) // suppression d'un projet
router.post('/:id/like' , auth, likeProject); // Liker un projet
router.post('/:id/comment' , auth, commentProject); // Commenter un projet



// On oublie pas d'exporter le router (permet a require dimporter le router) : 
module.exports = router;

