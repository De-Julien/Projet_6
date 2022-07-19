// importe le package express
const express = require('express');

// importe le dossier controllers
const saucesCtrl = require('../controllers/sauces');

// importe le dossier middleware pour les autorisations
const auth = require('../middleware/auth');

// importe le dossier middleware pour les autorisations
const multer = require('../middleware/multer-config');

// utilise la fonction router
const router = express.Router();

router.post("/", auth, saucesCtrl.postSauces);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauces);
router.put("/:id", auth, saucesCtrl.updateOneSauces);
router.delete("/:id", auth, saucesCtrl.deleteOneSauces);



// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;