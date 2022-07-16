// importe le package express
const express = require('express');

// importe le dossier controllers
const saucesCtrl = require('../controllers/sauces');

// utilise la fonction router
const router = express.Router();

router.post("/", saucesCtrl.postSauces);
router.get("/", saucesCtrl.getAllSauces);



// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;