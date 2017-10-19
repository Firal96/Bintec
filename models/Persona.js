// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var persona = new Schema({
	codigo: String,
    correo: String,
    contrasena: String,
    numCel: String,
    tipoDoc: String,
    numDoc: String,
    cuentas : [{numCta : String, contra : String}],
    susActuales : [{idSus : { type: Schema.ObjectId, ref : 'Suscripciones'}}]
},
{
	collection : "Personas"
});
// Compile model from schema
module.exports = mongoose.model('Personas', persona );