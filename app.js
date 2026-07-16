const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet'); // plugin de sécurité : permet d'ajouter une couche de sécurité au niveau du header
const cors = require('cors'); // on va s'attendre à ce que les requetes proviennent uniquement du même domaine de l'API
const rateLimit = require('express-rate-limit'); // permet de limiter le nombre de requetes sur un certain temps ex: le nombre de MDP
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes en millisecondes
  max: 100 // maximum 100 requêtes 
  // donc max 100 requetes sur 15 minutes
}))

// pour dire que les données seront en json :
app.use(express.json());

connectDB();

// On défini le générique des routes qui sont en /api/projects font référence aux fichiers de routes ./routes/projects.routes : 
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/users', require('./routes/users.routes'));


// Page d'acceuil : 


// liker un projet : 
// commenter un projet (création d'un commentaire) : 
// supprimer un projet
// modifier un projet

// modifier un commentaire
// supprimer un commentaire

// inscription : 
// connexion : 
// 

// On écoute le server : 
app.listen(5000, () => console.log('Server running'));
