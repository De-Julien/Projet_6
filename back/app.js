// importe le package express
const express = require('express');
// importe le package morgan qui log les requêtes
const morgan = require('morgan');
// importe la base de donnée mongodb
const mongoose = require("./database/db")
// importation path
const path = require("path");

// importe les routes utilisateurs
const userRoutes = require('./routes/user');
// importe les routes sauces
const saucesRoutes = require('./routes/sauces');

// créer une applicaltion express
const app = express();

// attrape les toutes les requètes de type json
app.use (express.json());

// log les requêtes et les reponses
app.use(morgan("dev"));

// pour que n'importe qui puisse se connecter sur l'api
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Route pour l'authentification
app.use("/api/auth", userRoutes);
// Route pour les sauces
app.use("/api/sauces", saucesRoutes);
// Route pour les images
app.use("/images", express.static(path.join(__dirname, "images")));
// exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;