// importation des modules
const express = require('express');

// importation du dossier controllers
const saucesCtrl = require('../controllers/sauces');
const likes = require('../controllers/like');

// importation du dossier middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

// utilise la fonction router
const router = express.Router();

// les routes possibles à utiliser
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauces);

router.post("/", auth, multer, saucesCtrl.postSauces);
router.post("/:id/like", auth, likes.sauceLike);

router.put("/:id", auth, multer, saucesCtrl.updateOneSauces);

router.delete("/:id", auth, saucesCtrl.deleteOneSauces);

// exportation pour pouvoir y accéder depuis un autre fichier
module.exports = router;