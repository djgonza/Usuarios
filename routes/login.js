const jwt = require('jsonwebtoken');
const userModel = require('models/user');
const config = require('config.json');

module.exports = login;

function login (req, res) {

	//Si no hay propiedad secret
	if (!req.body.hasOwnProperty('name') ||
		!req.body.hasOwnProperty('secret') ||
		!req.body.hasOwnProperty('domain')) {
		res.sendStatus(401);
		return;
	}

	userModel.findOne({
		name: req.body.name,
		secret: req.body.secret,
		domain: req.body.domain
	}).then(user => {
		var token = jwt.sign({
			userId: user._id,
			domain: user.domain
		}, config.userTokenSecret);
		res.send({userToken: token});
	}).catch (err => {
		console.log(err);
		res.sendStatus(500);
	});

}