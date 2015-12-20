'use strict';
var app = require("express")();
var Sequelize = require('sequelize');
var Personne = require('./Personne');

var pers = new Personne("Marc", "AUTRAN");
pers.decrire(); 

// sequelize initialization
var sequelize = new Sequelize('test', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
 
// check database connection
sequelize.authenticate().then(function(err){
    if (err) {
      console.log('Unable to connect to the database:', err);
    } else {
      console.log('Connection has been established successfully.');
    }
}); 

// model definition
var personnes = sequelize.define("personnes", {
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING
});
 
personnes.sync().then(function(err) {
    // insert new user
    personnes.create({
        nom: pers.nom,
        prenom: pers.prenom
    })
});

personnes.sync().then(function(err) {
    // insert new user
    personnes.create({
        nom: "bob",
        prenom: "password"
    })
});

personnes.destroy({where: {nom: "bob"}}).then(function(arg){
		console.log(arg);
});

personnes.find({where: { nom: 'AUTRAN' }}).then(function(john) {
            console.log('Hello ' + john.nom + '!');
            console.log('All attributes of john:', john.prenom);
        });

app.get("/", function(req, res) {
    res.send({name:"Hello Wolrd"});
});

app.listen( 5000);