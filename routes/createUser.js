const UserModel = require('models/user');

module.exports = saveUser;

/* Functions */

function saveUser (req, res) {

	/* Validaciones */
	if (!req.body.hasOwnProperty('name') ||
		!req.body.hasOwnProperty('secret') ||
		!req.body.hasOwnProperty('domain')) {
		res.sendStatus(400);
		res.send("Petición no valida");
		return;
	}

	//Comprobamos si el usuario ya esta registrado
	UserModel.findOne({
		name: req.body.name,
		secret: req.body.secret,
		domain: req.body.domain
	}).then(user => {

		//si el usuario ya existe
		if (user) throw "Usuario ya registrado";

		//Creamos el usuario
		var user = new UserModel({
			name: req.body.name,
			secret: req.body.secret,
			domain: req.body.domain
		});

		//Guardamos el usuario
		return user.save();

	})
	.then(createdUser => {
		res.send("ok");
	})
	.catch(err => {
		console.log(err);
		res.sendStatus(500);
	});

}

