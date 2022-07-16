// importation du modèle
const Sauces = require('../models/Sauces');

exports.postSauces = (req, res, next) => {
    console.log(req.body)
    const createSauces = new Sauces ({
        userId: req.body.userId,
        name: req.body.name
    })
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