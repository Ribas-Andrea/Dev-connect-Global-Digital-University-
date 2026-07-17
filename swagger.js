const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


// on va créer une variable option où il y aura la configuration générale de la doc : 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de gestion de projets",
      version: "1.0.0",
      description: "Documentation de l'API permettant de gérer les p^rojets, les commentaires et les utilisateurs"
    },
    // sur quel serveur est agrée les URL : 
    servers: [
      {url: 'http://localhost:5000'}
    ],
  },
  apis: ["./routes/*.js"],
};

// on applique les options à swagger : 

const swaggerSpec = swaggerJsDoc(options); // les spécifications de l'API

// on ajoute la route d'accès à la documentation de l'API : 
const setupSwagger = (app)  => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) // permet d'avoir toute la documentation de swaggerSpec
};

module.exports = setupSwagger;
