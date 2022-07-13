// importe le package http de node.js pour créer le serveur
const http = require('http');

// importe le fichier app.js
const app = require('./app');

// paramètrage du port avec la méthode set de Express
app.set('port', 3000);

// la méthode createServer prend en argument la fonction qui sera appelé à chaque requête reçu.
const server = http.createServer(app);

// le serveur écoute les requète sur le port
server.listen(3000);