// importation des modules
const fs = require("fs");

// importation des modèles
const Sauces = require('../models/Sauces');

// fonction de la route POST (postSauces)
exports.postSauces = (req, res, next) => {
    // convertit la chaine de caractère en json
    const sauceObjet = JSON.parse(req.body.sauce);
    // casse l'objet et change les données choisies
    const createSauces = new Sauces({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    // sauvegarde dans la base de données
    createSauces.save()
        .then(() => res.status(201).json({
            message: 'Sauces créé !'
        }))
        .catch(error => res.status(400).json({ error }))
};
// fonction de la route GET (getAllSauces)
exports.getAllSauces = (req, res, next) => {
    // récupère toutes les sauces de la base de données
    Sauces.find()
        .then((allSauces) => res.status(200).json(
            allSauces
        ))
        .catch(error => res.status(400).json({ error }))
};
// fonction de la route GET (getOneSauces)
exports.getOneSauces = (req, res, next) => {
    // récupère une sauce en fonction de l'ID
    Sauces.findOne({ _id: req.params.id })
        .then((oneSauces) => {
            if (oneSauces) {
                res.status(200).json(oneSauces)
            } else {
                res.status(404).json({ message: "La sauce n'existe pas !!" })
            }
        })
        .catch(error => res.status(500).json({ error }));
};
// fonction de la route PUT (updateOneSauces)
exports.updateOneSauces = (req, res, next) => {
    // trouve l'ID du produit dans la base de données
    Sauces.findOne({ _id: req.params.id })
        .then((oneSauces) => {
            // contrôle si l'ID de la base de données est différent de celui du token
            if (oneSauces.userId != req.auth.userId) {
                // supprime l'image envoyé
                fs.unlink(`images/${req.file.filename}`, (error) => {
                    if (error) throw error;
                });
                res.status(401).json({ message: "autorisation refusé !!" });
            } else {
                // Si un fichier est présent dans la requête
                if (req.file) {
                    // convertit la chaine de caractère en json
                    const sauceObjet = JSON.parse(req.body.sauce);
                    // casse l'objet et change l'image
                    const updateSauces = ({
                        ...sauceObjet,
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    });
                    // récupère l'image à modifier
                    const filename = oneSauces.imageUrl.split('/images/')[1];
                    // efface l'image sélectionner au-dessus
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                    });
                    // met à jours la base de données
                    Sauces.updateOne({ _id: req.params.id }, { ...updateSauces, _id: req.params.id })
                        .then(() => res.status(200).json({ message: "La sauce à été modifiée !!" }))
                        .catch(error => res.status(404).json({ error }));
                } else {
                    // met à jours la base de données
                    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                        .then(() => res.status(200).json({ message: "La sauce à été modifiée !!" }))
                        .catch(error => res.status(404).json({ error }));
                }
            }
        })
        .catch(error => res.status(500).json({ error }));
}
// fonction de la route DELETE (deleteOneSauces)
exports.deleteOneSauces = (req, res, next) => {
    // trouve l'ID du produit dans la base de données
    Sauces.findOne({ _id: req.params.id })
        .then((oneSauces) => {
            // contrôle si l'ID de la base de données est différent de celui du token
            if (oneSauces.userId != req.auth.userId) {
                res.status(401).json({ message: "autorisation refusé !!" });
            } else {
                // récupère l'image à modifier
                const filename = oneSauces.imageUrl.split('/images/')[1];
                console.log(filename);
                // efface l'image sélectionner au-dessus
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                });
                // efface la sauce selectionné de la base de données
                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "La sauce à été supprimée !!" }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch((error) => res.status(404).json({ error }));
};