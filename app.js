var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var mongoose = require('mongoose');
var fs = require('fs');
//Modelos
var Personas = require('./models/Persona');
var Activas = require('./models/Activas');
var Entidades = require('./models/Entidad');
var Suscripcionesentidad = require('./models/Suscripcion');
//var email = require('./Email');
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
mongoose.connect('mongodb://admin:bintec2017@ds125565.mlab.com:25565/bintec');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Apis de Personas

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/Persona/:idUsuario', function(req, res){
	if(req.params.idUsuario){
		console.log("entre" + req.params.idUsuario);
		mongoose.model('Personas').find({_id : req.params.idUsuario},function(err, persona){
			response.error = err;
			response.data = persona;
			if(err!=null && persona == {}){
				response.error = "404";
				response.errorMessage = "No se encontraron datos";
			}
			res.send(response);
		});
	}
});

app.get('/Persona', function(req, res){
	mongoose.model('Personas').find(function(err, persona){
		response.error = err;
		response.data = persona;
		if(err!=null && persona == {}){
			response.error = "404";
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
	var concat = req.body.usuario + req.body.contrasena;
	let buff = new Buffer(concat);  
	let base64data = buff.toString('base64');
	persona.codigo = base64data;
	persona.save(function(err, personaCreada){
		response.error = err;
		response.data = personaCreada;
		if (err!=null){
			response.errorMessage = "No se pudo Crear la Persona";
		}
		res.send(response);
	});

});

app.patch('/Persona/:idUsuario',function(req, res){
	mongoose.model('Personas').find({_id : req.params.idUsuario},function(err, persona){
		if(req.body.type == "cuenta"){
			var cuenta = {
				"numCta" : req.body.numCta,
				"contra" : req.body.contra
			}
			mongoose.model('Personas').findOneAndUpdate({_id: req.params.idUsuario}, {$push: {cuentas: cuenta}},function(error,personac){
				response.error = error;
				response.data = cuenta;
				if (err!=null){
					response.errorMessage = "No se pudo agregar la cuenta";
				}
				res.send(response);
			});
		}
		else{
			var suscripcion = {
				"idSus" : req.body.idSus
			}
			mongoose.model('Personas').findOneAndUpdate({_id: req.params.idUsuario}, {$push: {susActuales: suscripcion}},function(error,personac){
				response.error = error;
				response.data = suscripcion;
				if (err!=null){
					response.errorMessage = "No se pudo agregar la suscripcion";
				}
				res.send(response);
			});
		}

	});

});

app.delete('/Persona',function(req, res){
	mongoose.model('Personas').findByIdAndRemove(req.body.id , function(err,persona) {
		response.error = err;
		if (err!=null) {
			response.errorMessage = "No se pudo eliminar";
		}
		else{			
			console.log(persona);
		}
		res.send(response);

	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Apis de Entidades

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/Entidad', function(req, res){
	mongoose.model('Entidades').find(function(err, entidad){
		response.error = err;
		response.data = entidad;
		if(entidad == {}){
			response.error = "404";
			response.errorMessage = "No se encontraron datos";
		}
		res.send(response);
	});	
});

app.get('/Entidad/:idEntidad', function(req, res){
	mongoose.model('Entidades').find({_id : req.params.idEntidad},function(err, entidad){
		response.error = err;
		response.data = entidad;
		if(entidad == {}){
			response.error = "404";
			response.errorMessage = "No se encontraron datos";
		}
		res.send(response);
	});
});

app.post('/Entidad',function(req, res){
	let entidad = new Entidades();
	entidad.nombre = req.body.nombre;
	entidad.telefono = req.body.telefono;
	entidad.direccion = req.body.direccion;
	entidad.tpoDoc = req.body.tpoDoc;
	entidad.numDoc = req.body.numDoc;
	//var concat = req.body.usuario + req.body.contrasena;
	//let buff = new Buffer(concat);  
	//let base64data = buff.toString('base64');
	//persona.codigo = base64data;
	entidad.save(function(err, entidadCreada){
		response.error = err;
		response.data = entidadCreada;
		if (err!=null){
			response.errorMessage = "No se pudo Crear la Entidad";
		}
		res.send(response);
	});
});

app.patch('/Entidad/:idEntidad',function(req, res){
	mongoose.model('Entidades').find({_id : req.params.idEntidad},function(err, entidad){
		if(req.body.type == "cuenta"){
			var cuenta = {
				"numCta" : req.body.numCta,
				"contra" : req.body.contra
			}
			mongoose.model('Entidades').findOneAndUpdate({_id: req.params.idEntidad}, {$push: {cuentas: cuenta}},function(error,entidadc){
				response.error = error;
				response.data = cuenta;
				if (err!=null){
					response.errorMessage = "No se pudo agregar la cuenta";
				}
				res.send(response);
			});
		}
//		else{
//			var suscripcion = {
//				"idSus" : req.body.idSus
//			}
//			mongoose.model('Entidades').findOneAndUpdate({_id: req.params.idEntidad}, {$push: {suscripciones: suscripcion}},function(error,entidadc){
//				response.error = error;
//				response.data = suscripcion;
//				if (err!=null){
//					response.errorMessage = "No se pudo agregar la suscripcion";
//				}
//				else{
//					mongoose.model('Suscripciones').
//				}
//				res.send(response);
//			});
//		}

});

});

app.delete('/Entidad',function(req, res){
	mongoose.model('Entidades').findByIdAndRemove(req.body.id , function(err,entidad) {
		response.error = err;
		if (err!=null) {
			response.errorMessage = "No se pudo eliminar";
		}
		else{			
			console.log(entidad);
		}
		res.send(response);

	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Apis de Suscripcion

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/Suscripcion', function(req, res){
	mongoose.model('Suscripciones').find(function(err, suscripcion){
		response.error = err;
		response.data = suscripcion;
		if(suscripcion == {}){
			response.error = "404";
			response.errorMessage = "No se encontraron datos";
		}
		res.send(response);
	});	
});

app.get('/Suscripcion/:idSuscripcion', function(req, res){
	mongoose.model('Suscripciones').find({_id : req.params.idSuscripcion},function(err, suscripcion){
		response.error = err;
		response.data = suscripcion;
		if(suscripcion == {}){
			response.error = "404";
			response.errorMessage = "No se encontraron datos";
		}
		res.send(response);
	});
});

app.post('/Suscripcion',function(req, res){
	let suscripcion = new Suscripcionesentidad();
	suscripcion.costo = req.body.costo;
	suscripcion.tiempo = req.body.tiempo;
	suscripcion.entidad = req.body.entidad;	
	suscripcion.save(function(err, suscripcionCreada){
		var sus = {
			"idSus" : suscripcionCreada._id
		}
		mongoose.model('Entidades').findOneAndUpdate({_id: req.body.entidad}, {$push: {suscripciones: sus}},function(error,suscripcionc){});	
		response.error = err;
		response.data = suscripcionCreada;
		if (err!=null){
			response.errorMessage = "No se pudo Crear la Suscripcion";
		}
		res.send(response);
	});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Apis de Activos

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/Activas', function(req, res){
	mongoose.model('Activas').find(function(err, activas){
		response.error = err;
		response.data = activas;
		if(activas == {}){
			response.error = "404";
			response.errorMessage = "No se encontraron datos";
		}
		res.send(response);
	});	
});

app.get('/Activas/:type/:id/', function(req, res){
	if(req.params.type = "usuarios"){
		mongoose.model('Activas').find({usuarios : req.params.id},function(err, activas){
			response.error = err;
			response.data = activas;
			if(activas == {}){
				response.error = "404";
				response.errorMessage = "No se encontraron datos";
			}
			res.send(response);
		});
	}
	else{
		mongoose.model('Activas').find({suscripciones : req.params.id},function(err, activas){
			response.error = err;
			response.data = activas;
			if(activas == {}){
				response.error = "404";
				response.errorMessage = "No se encontraron datos";
			}
			res.send(response);
		});
	}
	
});

app.post('/Activas',function(req, res){
	let activar = new Activas();
	activar.usuario = req.body.usuario;
	activar.suscripcion = req.body.suscripcion;
	var tiempo;
	mongoose.model('Suscripciones').find({_id : req.params.idSuscripcion},function(err, suscripcion){
		tiempo = suscripcion.tiempo;
	});
	activar.tiempoRes = tiempo;
	activar.save(function(err, suscripcionCreada){
		var sus = {
			"idSus" : suscripcionCreada._id
		}
		mongoose.model('Personas').findOneAndUpdate({_id: req.body.usuario}, {$push: {susActuales: sus}},function(error,persona){});	
		response.error = err;
		response.data = suscripcionCreada;
		if (err!=null){
			response.errorMessage = "No se pudo Crear la Activacion";
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
