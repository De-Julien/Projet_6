// importe le package express
const express = require('express');

// importe le dossier controllers
const saucesCtrl = require('../controllers/sauces');

// importe le dossier middleware pour les autorisations
const auth = require('../middleware/auth');

// utilise la fonction router
const router = express.Router();

router.post("/", saucesCtrl.postSauces);
router.get("/", saucesCtrl.getAllSauces);
router.get("/:id", saucesCtrl.getOneSauces);
router.put("/:id", saucesCtrl.updateOneSauces);
router.delete("/:id", saucesCtrl.deleteOneSauces);



// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;