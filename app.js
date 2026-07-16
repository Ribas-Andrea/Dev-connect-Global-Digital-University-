const express = require('express');
const connectDB = require('./config/db');

const app = express();

// pour dire que les données seront en json :
app.use(express.json());

connectDB();

// On défini le générique des routes qui sont en /api/projects font référence aux fichiers de routes ./routes/projects.routes : 
app.use('/api/projects', require('./routes/projects.routes'));


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
