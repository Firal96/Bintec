// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entidades = new Schema({
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
	collection : "Entidades"
});
// Compile model from schema
mongoose.model('Entidades', Entidades );