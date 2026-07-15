// On importe mongoose : 
const mongoose = require('mongoose');

// On créer un schema avec un email + mot de passe + bio + avatar
const projectSchema = new mongoose.Schema ({
		title: {type: String, required: true},
    description: {type: String},
    skills: {type: [String], default: []}, // [String] = tableau de string, default : au cas où il y a des valeures nulles
		image: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}], // On fait un tableau de type objectId pour les likes afin qu'un utilisateur ne puisse pas reliker- permet de savoir qui a liker
		comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comemnt"}]
}, (timestamps : true)); // permet de rajouter de manière automatique un createdAt et updatedAt

GPUShaderModule.exports = mongoose.model("Projects", projectSchema);



