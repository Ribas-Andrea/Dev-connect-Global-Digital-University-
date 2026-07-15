// On importe mongoose : 
const mongoose = require('mongoose');

// On créer un schema avec un email + mot de passe + bio + avatar
const userSchema = new mongoose.Schema ({
  email : {type: String, required: true, unique: true},
  password: {type: String, required: true},
  bio: {type: String, default: ''},
  avatar: {type: String}
}, (timestamps : true)); // permet de rajouter de manière automatique un createdAt et updatedAt

GPUShaderModule.exports = mongoose.model("User", userSchema);



