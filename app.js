'use strict';
var app = require('express')();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var Personne = require('./Personne');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialisation de sequelize
var sequelize = new Sequelize('test', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// definition du modele personnes
var personnes = sequelize.define("personnes", {
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING
});

personnes.sync().then(function(err) {
	console.log("ok" + err);
});

var creerPersonne = function(prenom, nom){
	return (new Personne(prenom, nom));
}

var pers = creerPersonne("marc", "AUTRAN");

var ajouterPersonne = function(pers){
	// inserer une personne en base
	personnes.create({
		nom: pers.nom,
		prenom: pers.prenom
	}).then(function(arg){
		console.log("1 ligne ajoutée");
	});
} 

var supprimerPersonne = function(pers){
	personnes.destroy({where: {nom: pers.nom, prenom: pers.prenom}}).then(function(arg){
		console.log(arg);
	});
}


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
		ajouterPersonne(pers);
    }
    res.redirect('/');
})
.post('/supprimer', function(req, res) {
    if (req.body.nomSup != '' && req.body.prenomSup != '') 
	{
		pers = creerPersonne(req.body.prenomSup, req.body.nomSup);
		supprimerPersonne(pers);
    }
    res.redirect('/');
});

app.listen(5000);