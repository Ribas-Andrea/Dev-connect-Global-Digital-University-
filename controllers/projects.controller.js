const Project = require('../models/project.model');

// Création de la 1ère route API en mode get avec l'export pour la route = fonction qui nous permet de récupérer la liste des projets :
exports.getProjects =  (req, res) => {
	// on utilise try catch lorsqu'on manipule une base de données
	try{
		const projects = Project
		.find({}, 'title description') // dans l'objet vide ici {} ce ce les critères de selection : on peut choisir ce que l'on veut récupérer exemple : si je veux récupérer seulement les titre avec test on écrit : {title: 'test'}. Après la virgule, on choisit ce que l'on veut récupérer sans précision
		.populate('author', 'email') // dans author je ne veux que l'email
		.populate('comments', 'content') // dans comments je ne veux que content
		.sort({createdAt: -1 }) // permet de trier : ici trier par date de création dans l'ordre inverse (-1)

		// .populate évite la boucle infinie entre le projet et les commentaires puisque l'un appel l'autre. 

  	res.status(200).json(projects);
	} catch(err) {
		res.status(500).json({error: 'Erreur lors de la récupération des projets'});
	}

};


exports.getProject = (req, res) => {
	const id = req.params.id;


// Quand on s'appuie sur des données utilisateurs tels que l'id (ou sur req de manière golbale), il faut vérifier si l'id est bien un id mongoose : 
	if(!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({error: 'ID invalide'});


	const project = Project.findById({id})
		.select('title description skills image')
	// findOne est utile car on peut récupérer d'autres critères, parfois, il n'y a pas d'id. Si on a un id, on peut faire findById(id), ca donne : 
	// const id = req.params.id;
	// const project = Project.findById({id}) 
	// ou 
	// const { id } = req.params;
	// const project = Project.findById({id})

// Il faut aussi vérifier que le projet existe  : 
	if(!project)
		return res.status(404).json({error: 'Projet non trouvé'});
	// on peut mettre error en francais

	res.status(200).json(project);

	// le return fait sortir de la fonction donc pas besoin de if else
};

exports.createProject = async (req, res) => {
	try{
			// const project = req.body; = un peut trop direct, il vaut mieux récupérer chaque valeur : 
			const {title, description, skills, image } = req.body;

			if(!title)
				return res.status(400).json({error: 'Titre obligatoire'});

			const project = new Project ({
				title,
				description,
				skills,
				image,
				autho: req.user.userId,
				likes: [],
				comments: []
			})

			const savedProject = await project.save();
			res.staus(201).json(savedProject)
	} catch(err) {
		console.error(err);
		res.status(500).json({error: 'Erreur lors de la création'});
	}
	



// ou plus court : 
// res.staus(201).json(await project.save())

};