// importation des modules
const mongoose = require('mongoose');
const uniqueValidateur = require('mongoose-unique-validator');

// modèle pour enregistrer un utilisateur dans la base de données
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// utilise mongoose-unique-validator afin de vérifier que l'adresse mail n'est bien utilisée qu'une seule foi
userSchema.plugin(uniqueValidateur);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = mongoose.model('user', userSchema);