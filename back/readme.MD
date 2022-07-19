# installation
Vous aurez besoin d'avoir Node et `npm` installés localement sur votre machine.
Rennomez le fichier ".env.exemple" en ".env".
Modifier les variables d'environnement avec vos informations.

```
npm install
node server
```

Le port utilisé est le port:3000.

# Routes
## La route POST pour créer un compte
http://localhost:3000/api/auth/signup

```
{
    email: "user@domaine.com",
    password: "motdepasse"
}
```

## La route POST pour se connecter
http://localhost:3000/api/auth/login

## La route POST pour créer les sauces
http://localhost:3000/api/sauces

## La route GET pour afficher un tableau contenant toutes les sauces
http://localhost:3000/api/sauces

## La route GET pour afficher la sauce selectionné par ID
http://localhost:3000/api/sauces/{sauceId}

## La route PUT pour modifier la sauce selectionné par ID
http://localhost:3000/api/sauces/{sauceId}