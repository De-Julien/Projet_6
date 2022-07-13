// importe le package express
const express = require('express');

// importe le package morgan qui log les requêtes
const morgan = require('morgan');

// importe la base de donnée mongodb
const mongoose = require("./database/db")

// importe les routes utilisateurs
//const userRoutes = require('./routes/user');

// créer une applicaltion express
const app = express();

//log les requêtes et les reponses
app.use(morgan("dev"));

// route général    
app.use((req, res) => {
    res.status(201)
    res.json({ message: "requète" })
});

// exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;