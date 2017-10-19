// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entidad = new Schema({
    nombre : String,
    telefono : Number,
    direccion : String,
    suscripciones : [
    	{idSus : { type: Schema.ObjectId, ref : 'Suscripciones'}}
    ],
    numDoc : Number,
    tpoDoc : Number,
    cuentas : [{numCta : String, contra : String}]
    
},
{
	collection : "Personas"
});
// Compile model from schema
mongoose.model('Personas', persona );