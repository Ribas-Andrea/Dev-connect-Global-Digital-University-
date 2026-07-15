const {default: mongoose} = require('mongoose');

const connectDB = async () => {
    // Connexion à MongoDB : 
    try {
      await mongoose.connect('mongodb+srv://Andrea:q2zRkmh1wUqVZPhq@cluster0.rdfu7fa.mongodb.net/?appName=Cluster0');
      console.log("MongoDB connected");
    } catch (err) {
      console.log(err.message);
    }
    

}

module.exports = connectDB;