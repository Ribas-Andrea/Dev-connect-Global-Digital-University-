// On importe mongoose : 
const mongoose = require('mongoose');

// On créer un schema avec un email + mot de passe + bio + avatar
const commentSchema = new mongoose.Schema ({
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true} 
}, {timestamps : true}); // permet de rajouter de manière automatique un createdAt et updatedAt

module.exports = mongoose.model("Comment", commentSchema);

