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

exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({_id : req.params.id})
    .then((oneSauces) => res.status(200).json(
        oneSauces
    ))
    .catch(error => res.status(404).json({ error }))
};

exports.updateOneSauces = (req, res, next) => {
    Sauces.updateOne({_id : req.params.id} , {...req.body, _id : req.params.id} )
    .then(() => res.status(200).json({ message : "la sauce à été modifié !!"}))
    .catch(error => res.status(40).json({ error }))
};

exports.deleteOneSauces = (req, res, next) => {
    Sauces.findOne({_id : req.params.id})
    .then(() => res.status(200).json())
    .catch(error => res.status(404).json({ error }))
};