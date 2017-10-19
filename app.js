var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var mongoose = require('mongoose');
var fs = require('fs');
var Personas = require('./models/Persona');
//var Ids=require('./routes/routing');
//var index = require('./routes/index');
//var users = require('./routes/users');

//Estructura de Respuesta del Api
var data;
var response = {
	"error" : "000",
	"data" : data,
	"errorMessage" : "Ok"
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connection to MoingoDb
mongoose.connect('mongodb://localhost:27017/Bintec');

//Load all models
//fs.readdirSync(__dirname + '/models').forEach(function (filename){
//	if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
//});

app.get('/Persona/:idUsuario', function(req, res){
	mongoose.model('Personas').find({_id : req.params.idUsuario},function(err, persona){
		response.error = err;
		response.data = persona;
		if(err!=null){
			response.errorMessage = "No se encontraron datos";
		}
		res.send(response);
	});
});

app.post('/Persona',function(req, res){
	let persona = new Personas();
	persona.nombre = req.body.nombre;
	persona.correo = req.body.correo;
	persona.numCel = req.body.numCel;
	persona.tipoDoc = req.body.tipoDoc;
	persona.numDoc = req.body.numDoc;
	persona.save(function(err, personaCreada){
		response.error = err;
		response.data = personaCreada;
		if (err!=null){
			response.errorMessage = "No se pudo Crear la Persona";
		}
		res.send(response);
	});

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
