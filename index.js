var app = require("express")();
var Sequelize = require('sequelize');
 
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
var User = sequelize.define("User", {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});
 
User.sync().then(function(err) {
    // insert new user
    User.create({
        username: "bob",
        password: "password"
    })
});

User.destroy({where: {username: "bob"}}).then(function(arg){
		console.log(arg);
});

User.find({where: { username: 'bob' }}).then(function(john) {
            console.log('Hello ' + john.username + '!');
            console.log('All attributes of john:', john.password);
        })

app.get("/", function(req, res) {
    res.send({name:"Hello Wolrd"});
});

app.listen( 5000);