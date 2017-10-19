// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Activas = new Schema({
    tiempoRes : Number,
    usuarios :  { type: Schema.ObjectId, ref : 'Personas'},
    suscripciones : { type: Schema.ObjectId, ref : 'Suscripciones'},
       
},
{
	collection : "Activas"
});
// Compile model from schema
module.exports = mongoose.model('Activas', Activas );