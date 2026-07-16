const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req,file, callback) => callback(null, 'uploads/'),
  filename: (req, file, callback) => {
    //test.png => renommage <> 123456-789.png : 
    const unique = Date.now() + '-' + Math.round(Math.random() * 100000);
    callback(null, unique + path.extname(file.originalname));
  }
})
const fileFilter = (req, file, callback) => {
  const allowedTypes = /jpeg|jpg|png|gifwebp/; // on va autoriser les types d'extension cités
  const isExtensionValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // on vérifie si l'extension de allowedTypes est respecté
  const isMimeTypeValid = allowedTypes.test(file.mimetype); // on vérifie si le type d'extension est respecté (c'est à dire le ficher à l'interieur), par exemple on peut avoir test.js qui a été renommé en test.png mais c'est du js à l'interieur
  if(isExtensionValid && isMimeTypeValid)
    callback(null, true);
  else {
    callback(new Error('Seules les images sont autorisées'));
  }
}

const upload = multer({
  storage: storage, // methode de stockage
  fileFilter: fileFilter, // filtre de fichier
  limits: {fileSize: 5 * 1024 * 1024} // on limite la taille de l'image à 5 mo (5octets * 1024 kilooctets * 1024 megaoctets)
})

module.exports = upload;