// importe le package mongoose
const mongoose = require('mongoose');

// modèle de base de donnée pour enregistrer un utilisateur
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    //manufacturer: { type: String, required: true },
   // description: { type: String, required: true },
    //mainPepper: { type: String, required: true },
   // imageUrl: { type: String, required: true },
   // heat: { type: Number, required: true },
   // likes: { type: Number, required: true },
   // dislikes: { type: Number, required: true },
    //usersLiked: { type: String, required: true },
   // usersDisliked: { type: String, required: true }
});

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = mongoose.model('sauces', sauceSchema);
