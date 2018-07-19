require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./routes');
const config = require('./config');


//Colores para la consola, mover
var colors = require('colors');
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

var app = express();

app.use(cors());

app.use(express.json({limit: config.maxJsonFileAccept}));
app.use(bodyParser.json());

app.use(routes);

const port = process.env.PORT || 3600;
app.listen(port, () => {

	console.log('Server start in port: '.green, colors.green(port));
	
	/* Moongose */
	var mongoose = require('mongoose');
	mongoose.Promise = require('q').Promise;
	mongoose.connect(config.databaseString);
	mongoose.connection.on('connected', () => {
		console.log(colors.green('MongoDb Connected!'));
	});
	mongoose.connection.on('error', (err) => {
		console.log(colors.red(err));
	});
	mongoose.connection.on('disconnected', () => {
		console.log(colors.red('MongoDb Disconnected!'));
		process.exit(1);
	});

});