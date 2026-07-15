

// Création de la 1ère route API en mode get avec l'export pour la route = fonction qui nous permet de récupérer la liste des projets :
exports.getProjects =  (req, res) => {
  res.status(200).json([{
		id: 1,
		title: 'Mon super projet',
		image: 'cover.png',
		skills: ['Node.js', 'express', 'Angular'],
		description: '...'
    }]);
};