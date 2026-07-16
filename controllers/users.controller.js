const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator'); // plugin de sécurité du mdp


// inscription : 
exports.register = async (req, res) => {
try{
      const {email, password, bio, avatar} = req.body;
      if(!email || !password)
        return res.status(400).json({message: 'Email et password obligatoire'});

      const schema = new passwordValidator();
      schema.is().min(8).has().uppercase().has().digits().has().not().spaces; 
      // le mdp doit avoir :  
      // * au moins 8 caractères = .min(8),
      // * au moins une majuscule =  has().uppercase(),
      // * au moins un nombre = .has().digits(),
      // * il ne doit pas y avoir d'espace = .has().not().spaces
      if(!schema.validate(password)){
        return res.status(400).json({message: 'Mot de passe trop faible'});
      }

      // on vérifie si l'utilisateur existe déjà : 
      const existingUser = await User.findOne({ email });
      if(existingUser)
        return res.status(400).json({message: 'Compte déjà existant'});

      // il faut hacher les mots de passe : 
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        bio,
        avatar
      });
      await newUser.save();
      res.status(201).json(newUser);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: 'Erreur Serveur'});
  }
}



// connexion : 
exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password)
          return res.status(400).json({message: 'Email et password obligatoire'});

        // on vérifie si l'utilisateur existe déjà : 
        const existingUser = await User.findOne({ email });
        if(!existingUser)
          return res.status(400).json({message: 'Identifiant Ivalides'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect)
          return res.status(400).json({message: 'Identifiant Ivalides'});

        const token = jwt.sign(
        {userId: existingUser._id},
        process.env.JWT_SECRET, 
        {expiresIn: '7d'}
        );
        res.status(200).json({token, user: existingUser});

    } catch(err) {
    console.error(err);
    res.status(500).json({message: 'Erreur Serveur'});
    }
}
