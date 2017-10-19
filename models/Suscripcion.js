// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Suscripcion = new Schema({
	entidad: { type: Schema.ObjectId, ref : 'Entidades'};
    tiempo: Number,
    costo: Number
},
{
	collection : "Suscripciones"
});
// Compile model from schema
module.exports = mongoose.model('Suscripciones', Suscripcion );