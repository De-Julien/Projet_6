// importation de multer 
const multer = require('multer');

// gère les différentes extensions
const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// enregistrement sur le DD
const storage = multer.diskStorage({
    // chemin ou le fichier est enregistré
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // gère les noms des fichiers pour éviter d'avoir les mêmes 2 foi
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = multer({ storage }).single('image');