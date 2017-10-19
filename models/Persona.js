// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var persona = new Schema({
    Nombre: String,
    
},
{
	collection : "Personas"
});
// Compile model from schema
mongoose.model('Personas', persona );