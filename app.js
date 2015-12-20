'use strict';
var app = require('express')();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var Personne = require('./Personne');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// model definition
var personnes = sequelize.define("personnes", {
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING
});

var creerPersonne = function(prenom, nom){
	return (new Personne(prenom, nom));
}

var pers = creerPersonne("marc", "AUTRAN");

var insertPersonne = function(pers){
	personnes.sync().then(function(err) {
		// insert new user
		personnes.create({
			nom: pers.nom,
			prenom: pers.prenom
		})
	});
} 

//personnes.destroy({where: {nom: "bob"}}).then(function(arg){
//		console.log(arg);
//});

//personnes.find({where: { nom: 'AUTRAN' }}).then(function(user) {
//            console.log('Hello ' + user.nom + '!');
//            console.log('All attributes of user:', user.prenom);
//        });

app.get("/", function(req, res) {
    res.render('index.ejs', {nom: pers.nom, prenom: pers.prenom});
})
.post('/ajouter', function(req, res) {
    if (req.body.nom != '' && req.body.prenom != '') 
	{
		pers = creerPersonne(req.body.prenom, req.body.nom);
		insertPersonne(pers);
    }
    res.redirect('/');
});

app.listen( 5000);