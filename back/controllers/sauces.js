// importation du modèle
const Sauces = require('../models/Sauces');

function formatError(res, error) {
    if (error.name === "CastError") {
        res.status(400).json({ message: "Le format de la demande est incorrect !!" })
    } else {
        res.status(500).json({ message: "Une erreur est survenue !!" })
    }
};
exports.postSauces = (req, res, next) => {
    if (req.body.userId === req.auth.userId) {
        const createSauces = new Sauces({
            userId: req.auth.userId,
            name: req.body.name
            //manufacturer: req.body.manufacturer,
            //description: req.body.description,
            //mainPepper: req.body.mainPepper,
            //imageUrl: req.body.imageUrl
        })
        createSauces.save()
            .then(() => res.status(201).json({
                message: 'Sauces créé !'
            }))
            .catch(error => res.status(400).json({ error }))

    } else {
        res.status(401).json({ message: "Autorisation refusé, l'ID utilisateur n'est pas correcte !!" })
    }
};

exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then((allSauces) => res.status(200).json(
            allSauces
        ))
        .catch(error => res.status(400).json({ error }))
};

exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((oneSauces) => {
            if (oneSauces) {
                res.status(200).json(oneSauces)
            } else {
                res.status(404).json({ message: "La sauce n'existe pas !!" })
            }
        })
        .catch(error => formatError(res, error));
};

exports.updateOneSauces = (req, res, next) => {
    if (req.body.userId === req.auth.userId) {
        console.log(req.params.id);
        Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
            .then(() => res.status(200).json({ message: "La sauce à été modifiée !!" }))
            .catch(error => formatError(res, error));
    } else {
        res.status(401).json({ message: "Autorisation refusé, l'ID utilisateur n'est pas correcte !!" })
    }
};

exports.deleteOneSauces = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then((del) => {
            console.log(del);
            if (del) {
                res.status(200).json({ message: "La sauce à été supprimée !!" })
            } else {
                res.status(404).json({ message: "La sauce n'existe pas !!" })
            }
        })
        //.then(() => res.status(200).json({ message: "La sauce à été supprimée !!" }))
        .catch(error => formatError(res, error));
};
