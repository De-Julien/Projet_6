// importation bcrypt pour chiffré les mdp
const bcrypt = require('bcrypt');

// importation de jsonwebtoken
const jwt = require('jsonwebtoken');

// importation du modèle
const User = require('../models/user');

// exporte la fonction signup
exports.signup = (req, res, next) => {
    // récupère le mdp envoyer pour l'inscription et le crypte
    bcrypt.hash(req.body.password, 10)
        // créer un nouvel objet utilisateur en remplacant le mdp par le mdp hasher
        .then(hash => {
            const createUser = new User({
                email: req.body.email,
                password: hash
            })
            // sauvegarde le nouvel utilisateur dans la base de donnée
            createUser.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// exporte la fonction login
exports.login = (req, res, next) => {
    // cherche dans la base de donnée si l'utilisateur est bien dedans
    User.findOne({ email: req.body.email })
        .then(user => {
            // si l'utilisateur n'est pas dans la base de donnée
            if (user === null) {
                res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                // si l'utilisateur est dans la base de donnée
            } else {
                // verifie si le mot de passe est bien celui de la base de donnée
                bcrypt.compare(req.body.password, user.password)
                    .then(validPassword => {
                        // si le mdp n'est pas bon
                        if (!validPassword) {
                            res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                        // si le mdp est correct    
                        } else {
                            // envoie userId + token
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    `${process.env.RANDOM_TOKEN_SECRET}`,
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