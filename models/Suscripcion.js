// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Suscripcion = new Schema({
    Tiempo: Number,
    Costo: Number,


},
{
	collection : "Suscripciones"
});
// Compile model from schema
mongoose.model('Suscripciones', Suscripcion );