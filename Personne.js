'use strict';
module.exports = class Personne 
{ 
    constructor(firstName, lastName)
	{ 
        this.prenom = firstName; 
        this.nom = lastName; 
    } 

    decrire()
	{ 
        console.log("nom : " + this.nom + " et prenom : " + this.prenom); 
    } 
}