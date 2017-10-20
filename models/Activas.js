// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Activas = new Schema({
    tiempoRes : Number,
    usuario :  { type: Schema.ObjectId, ref : 'Personas'},
    suscripcion : { type: Schema.ObjectId, ref : 'Suscripciones'},
       
},
{
	collection : "Activas"
});
// Compile model from schema
module.exports = mongoose.model('Activas', Activas );