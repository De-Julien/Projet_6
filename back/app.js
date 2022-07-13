// importe le package express
const express = require('express');

// importe le package mongoose
const mongoose = require('mongoose');

// importe le package dotenv
const dotenv = require('dotenv');
const dotenvConfig = dotenv.config();

// importe les routes utilisateurs
const userRoutes = require('./routes/user');

// créer une applicaltion express
const app = express();

mongoose.connect(process.env.MONGODB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// route général    
app.use(express.json());

// exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;