const {default: mongoose} = require("mongoose");
const Project = require('../models/project.model');
const Comment = require('../models/comment.model');

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


exports.getProject = async (req, res) => {
	const id = req.params.id;


// Quand on s'appuie sur des données utilisateurs tels que l'id (ou sur req de manière golbale), il faut vérifier si l'id est bien un id mongoose : 
	if(!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({error: 'ID invalide'});


	const project = await Project.findById(id)
		// .select('title description skills image') => on retire pour avoir toutes les données du projet, dont les likes
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
			const {title, description, skills, image} = req.body;
			// const image = req.file.filename;

			if(!title)
				return res.status(400).json({error: 'Titre obligatoire'});
			const project = new Project ({
				title,
				description,
				skills,
				image, // 123456-789.png 
				author: req.user.userId,
				likes: [],
				comments: []
			})

			const savedProject = await project.save();
			res.status(201).json(savedProject)
			// ou plus court : 
			// res.staus(201).json(await project.save())
	} catch (err) {
    console.error(err);
    res.status(500).json({
        error: err.message
    });
}
};

exports.updateProject = async (req, res) => {
	try {
		const { id } = req.params; // on récupère l'id du projet
		const {title, description, skills, image} = req.body;

		const project = await Project.findById(id);
		if(!project) {
			return res.status(404).json({error: 'Projet non trouvé'});
		}

		if(project.author.toString() !== req.user.userId) {
			return res.status(403).json({error: 'Accès refusé: Vous n\'êtes pas l\'auteur'});
		}

		if(title)
			project.title = title;

		if(description)
			project.description = description;

		if(skills)
			project.skills = skills;

		if(image)
			project.image = image;

		const updatedProject = await project.save();
		res.json(updatedProject);


	} catch(err) {
		console.error(err);
		res.status(500).json({error: 'Erreur lors de la modification'});
	}
}

exports.deleteProject = async (req,res) => {
try{
		const { id } = req.params;

		const userId = req.user.userId; // on récupère l'utilisateur connecté

		const project = await Project.findById(id); // on récupère le projet
		if(!project) {
			return res.status(404).json({error: 'Projet non trouvé'});
		}

		if(project.author.toString() !== req.user.userId) {
			return res.status(403).json({error: 'Accès refusé: Vous n\'êtes pas l\'auteur'});
		}


		await project.deleteOne();
		res.json({message: 'Projet supprimé avec succès'});

} catch(err) {
		console.error(err);
		res.status(500).json({error: 'Erreur lors de la modification'});
	}
}

exports.likeProject = async (req,res) => {
	try{
		const { id } = req.params;

		const userId = req.user.userId;

		const project = await Project.findById(id); // on récupère le projet
		if(!project) {
			return res.status(404).json({error: 'Projet non trouvé'});
		}

		// est-ce qu'il y a déjà un like de cet utilisateur ? : 
		const alreadyLiked = project.likes.includes(userId);  //Sur le projet.model, je prend les likes  et je regarde s'il y a le userId

		if(alreadyLiked){ // si j'ai déjà liker le projet
			project.likes = project.likes.filter(uId => uId.toString() !== userId ) // je retire le like
		} else {
			project.likes.push(userId); // si pas de like, on mais un like
		}

		await project.save(); // on oublie pas le save
		res.json({likes: project.likes, liked: !alreadyLiked}); // affiche un message : est ce que j'ai liker ou pas ? 

} catch(err) {
		console.error(err);
		res.status(500).json({error: 'Erreur lors du like'});
	}
}

exports.commentProject = async (req, res) => {
	try{
		const { id } = req.params;
		const userId = req.user.userId;
		const { content } = req.body;

		const project = await Project.findById(id);
		if(!project) {
			return res.status(404).json({error: 'Projet non trouvé'});
		}
 		// on vérifie qu'il y a le contenu
		if(!content) {
			return res.status(400).json({error: 'Contenu Obligatoire'});
			
		}

		// on créer le commentaire : 
		const comment = new Comment ({
			content,
			author: userId,
			project: id
		});
		const savedComment = await comment.save();

		// on met à jour le projet : 
		project.comments.push(savedComment._id);
		await project.save();

		// on retourne le commentaire créée : 
		const updatedProject = await Project.findById(id);
		console.log("Après save :", updatedProject.comments);
		res.status(201).json(savedComment);

		} catch(err) {
				console.error(err);
				res.status(500).json({error: 'Erreur lors l\'ajout du commentaire'});
		}
}

