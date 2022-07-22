// importation des modules
const express = require('express');
const morgan = require('morgan');
const path = require("path");

// importation de la base de données
const mongoose = require("./database/db")

// importation des routes utilisateurs
const userRoutes = require('./routes/user');
// importation des routes sauces
const saucesRoutes = require('./routes/sauces');

// créer une applicaltion express
const app = express();

// attrape les toutes les requêtes du type json
app.use (express.json());

// log les requêtes et les réponses
app.use(morgan("dev"));

// restriction pour se connecter sur l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// route pour l'authentification
app.use("/api/auth", userRoutes);
// route pour les sauces
app.use("/api/sauces", saucesRoutes);
// route pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = app;