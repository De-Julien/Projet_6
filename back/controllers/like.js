// importation des modèles
const Sauces = require('../models/Sauces');

// fonction de la route POST (sauceLike)
exports.sauceLike = (req, res, next) => {
    // récupère une sauce en fonction de l'ID
    Sauces.findOne({ _id: req.params.id })
        .then((oneSauces) => {
            // si l'utilisateur est présent dans le tableau usersliked de la base de données et qu'il dislikes
            if (oneSauces.usersLiked.includes(req.auth.userId) && req.body.likes === -1) {
                // Mets à jour les données avec inc qui ajoute la valeur à likes et pull qui retire l'utilisateur au tableau usersliked
                Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: -1, dislikes: +1 }, $pull: { usersLiked: req.auth.userId }, $push: { usersDisliked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "maintenant je n'aime plus +1" }))
                    .catch((error) => res.status(400).json({ error }));
            } // si l'utilisateur est présent dans le tableau usersDisliked de la base de données et qu'il likes
            else if (oneSauces.usersDisliked.includes(req.auth.userId) && req.body.likes === 1) {
                // Mets à jour les données avec inc qui ajoute la valeur à likes et pull qui retire l'utilisateur au tableau usersliked
                Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: +1, dislikes: -1 }, $pull: { usersDisliked: req.auth.userId }, $push: { usersLiked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "maintenant j'aime +1" }))
                    .catch((error) => res.status(400).json({ error }));
            } // si l'utilisateur n'est pas présent dans le tableau usersliked de la base de données
            else if (!oneSauces.usersLiked.includes(req.auth.userId) && req.body.likes === 1) {
                // Mets à jour les données avec inc qui ajoute la valeur à likes et push qui ajoute l'utilisateur au tableau usersliked
                Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "J'aime +1" }))
                    .catch((error) => res.status(400).json({ error }));
            } // si l'utilisateur est présent dans le tableau usersliked de la base de données
            else if (oneSauces.usersLiked.includes(req.auth.userId) && req.body.likes === 0) {
                // Mets à jour les données avec inc qui ajoute la valeur à likes et pull qui retire l'utilisateur au tableau usersliked
                Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "J'aime -1" }))
                    .catch((error) => res.status(400).json({ error }));
            } // si l'utilisateur n'est pas présent dans le tableau usersDisliked de la base de données 
            else if (!oneSauces.usersDisliked.includes(req.auth.userId) && req.body.likes === -1) {
                // Mets à jour les données avec inc qui ajoute la valeur à likes et pull qui retire l'utilisateur au tableau usersliked
                Sauces.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "Je n'aime pas +1" }))
                    .catch((error) => res.status(400).json({ error }));
            } // si l'utilisateur est présent dans le tableau usersDisliked de la base de données
            else if (oneSauces.usersDisliked.includes(req.auth.userId) && req.body.likes === 0) {
                // Mets à jour les données avec inc qui ajoute la valeur à likes et pull qui retire l'utilisateur au tableau usersliked
                Sauces.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "Je n'aime pas -1" }))
                    .catch((error) => res.status(400).json({ error }));
            } // si un des choix ci-dessus a déjà été effectuer
            else {
                res.status(401).json({ message: "Le vote a déjà été effectué" });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};