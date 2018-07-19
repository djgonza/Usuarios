const jwt = require('jsonwebtoken');
const userModel = require('models/user');
const config = require('config.json');

module.exports = refreshToken;

/* Logueamos al usuario y cremos el refreshToken  */
function refreshToken (req, res) {

	try {

		if (!req.body.hasOwnProperty('name') ||
			!req.body.hasOwnProperty('secret')) 
		{
			throw new Error("Not hasOwnProperty");
		}

		userModel.findOne({
			name: req.body.name,
			secret: req.body.secret
		}).then(user => {

			if (!user) {
				throw new Error("Not user found");
			}

			var token = jwt.sign({
				userId: user._id,
				domains: user.domains
			}, config.refreshTokenSecret, { expiresIn: config.expiresTimeRefreshToken });

			res.send({refreshToken: token});

		}).catch (err => {
			console.log(err);
			res.sendStatus(401);
		});

	} catch (err) {
		console.log(err);
		res.sendStatus(401);
	}

}



