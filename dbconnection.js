var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'Bintec',  
    password: 'Bintec2017',  
    database: 'subscripthub'  
});  
module.exports = connection;  
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/Bintec';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));