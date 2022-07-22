// importation des modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importation des modèles
const User = require('../models/user');

// fonction de la route POST (signup)
exports.signup = (req, res, next) => {
    // récupère le Mdp envoyé pour l'inscription et le crypte
    bcrypt.hash(req.body.password, 10)
        // créer un nouvel objet utilisateur en remplaçant le Mdp par le Mdp hash
        .then(hash => {
            const createUser = new User({
                email: req.body.email,
                password: hash
            })
            // sauvegarde le nouvel utilisateur dans la base de données
            createUser.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// fonction de la route POST (login)
exports.login = (req, res, next) => {
    // regarde dans la base de données si l'utilisateur s'y trouve.
    User.findOne({ email: req.body.email })
        .then(user => {
            // si l'utilisateur n'est pas dans la base de données
            if (user === null) {
                res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                // si l'utilisateur est dans la base de données
            } else {
                // vérifie si le mot de passe est bien celui de la base de données
                bcrypt.compare(req.body.password, user.password)
                    .then(validPassword => {
                        // si le Mdp n'est pas bon
                        if (!validPassword) {
                            res.status(401).json({ message: "L'identifiant ou le mot de passe est incorrecte" })
                        // si le Mdp est le bon 
                        } else {
                            // envoie userId + token a l'utilisateur
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