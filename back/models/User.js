// importe le package mongoose
const mongoose = require('mongoose');

// importe le package mongoose-unique-validator
const uniqueValidateur = require('mongoose-unique-validator');

// modèle de base de donnée pour enregistrer un utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// utilise mongoose-unique-validator afin de vérifier que l'adresse mail n'est bien utilisé qu'une seul foi
userSchema.plugin(uniqueValidateur);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = mongoose.model('user', userSchema);