// Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var persona = new Schema({
    Nombre: String,
    Correo: String,
    NumCel: String,
    tipoDoc: String,
    numDoc: String,
    cuentas : [
        {NumeroCuenta: string,
         password: string,}
    ],

},
{
	collection : "Personas"
});
// Compile model from schema
mongoose.model('Personas', persona );