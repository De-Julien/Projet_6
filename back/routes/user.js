// importation des modules
const express = require('express');

// importation du dossier controllers
const userCtrl = require('../controllers/user');

// utilise la fonction router
const router = express.Router();

// utilise les paramètres de signup dans controllers
router.post('/signup', userCtrl.signup);

// utilise les paramètres de login dans controllers
router.post('/login', userCtrl.login);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;