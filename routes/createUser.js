const UserModel = require('models/user');

module.exports = saveUser;

/* Functions */

function saveUser (req, res) {

	try {

		if (!req.body.hasOwnProperty('name') ||
			!req.body.hasOwnProperty('secret') ||
			!req.body.hasOwnProperty('domains')) 
		{
			throw new Error("Not hasOwnProperty");
		}

		//Comprobamos si el usuario ya esta registrado
		UserModel.findOne({
			name: req.body.name,
			secret: req.body.secret
		}).then(user => {

			//si el usuario ya existe
			if (user) throw new Error("User already registered");

			//Creamos el usuario
			var user = new UserModel({
				name: req.body.name,
				secret: req.body.secret,
				domains: req.body.domains
			});

			//Guardamos el usuario
			return user.save();

		})
		.then(createdUser => {
			res.send("ok");
		})
		.catch(err => {
			throw err;
		});

	} catch(err) {
		console.log(err);
		res.sendStatus(500);
	}

}

