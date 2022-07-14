// importe le package express
const express = require('express');

// importe le dossier controllers
const saucesCtrl = require('../controllers/user');

// utilise la fonction router
const router = express.Router();



// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;