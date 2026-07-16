const {default: mongoose} = require('mongoose');

const connectDB = async () => {
    // Connexion à MongoDB : 
    try {
      await mongoose.connect('mongodb+srv://'+process.env.DB_USER+':' +process.env.DB_PASSWORD+'@cluster0.rdfu7fa.mongodb.net/?appName=Cluster0');
      console.log("MongoDB connected");
    } catch (err) {
      console.log(err.message);
    }
    

}

module.exports = connectDB;