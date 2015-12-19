var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var Personne = sequelize.define('personne', {
  nom: {
    type: Sequelize.STRING,
  },
  prenom: {
    type: Sequelize.STRING
  }
});

Personne.sync().then(function () {
  return Personne.create({
    nom: 'John',
    prenom: 'Hancock'
  });
});

Personne.findOne().then(function (user) {
    console.log(user.nom);
});