// importation bcrypt pour chiffré les mdp
const bcrypt = require('bcrypt');

// importation de jsonwebtoken
const jwt = require('jsonwebtoken');

// importation du modèle
const User = require('../models/user');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const createUser = new User({
                email: req.body.email,
                password: hash
            })
            createUser.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur crée !'
                }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '12h' }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
};