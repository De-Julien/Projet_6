// importation du modèle
const { parse } = require('dotenv');
const Sauces = require('../models/Sauces');

function formatError(res, error) {
    if (error.name === "CastError") {
        res.status(400).json({ message: "Le format de la demande est incorrect !!" })
    } else {
        res.status(500).json({ message: "Une erreur est survenue !!" })
    }
};
exports.postSauces = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    console.log(sauceObjet);
    const createSauces = new Sauces({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    createSauces.save()
        .then(() => res.status(201).json({
            message: 'Sauces créé !'
        }))
        .catch(error => res.status(400).json({ error }))
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
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "La sauce à été modifiée !!" }))
        .catch(error => formatError(res, error));
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
