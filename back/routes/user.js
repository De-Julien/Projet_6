// importe le package express
const express = require('express');

// importe le dossier controllers
const userCtrl = require('../controllers/user');

// utilise la fonction router
const router = express.Router();

// importe les paramètres de signup dans controllers
router.post('/signup', userCtrl.signup);

// importe les paramètres de login dans controllers
router.post('/login', userCtrl.login);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;