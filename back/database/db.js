// importation des modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Permets de cacher les informations sensibles via des clés
const dotenvConfig = dotenv.config();

// permets de lier la base de données au serveur
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = mongoose;