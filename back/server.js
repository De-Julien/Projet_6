// importation des modules
const http = require('http');

// importation de la route app
const app = require('./app');

// paramétrage du port avec la méthode set d'Express
app.set('port', 3000);

// la méthode createserver prend en argument la fonction qui sera appelée à chaque requête reçue
const server = http.createServer(app);

// le serveur écoute les requêtes sur le port
server.listen(3000);