// importation des modules
const mongoose = require('mongoose');

// modèle pour enregistrer une sauce dans la base de données
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = mongoose.model('sauces', sauceSchema);
