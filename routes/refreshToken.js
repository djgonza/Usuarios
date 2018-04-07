const jwt = require('jsonwebtoken');
const userModel = require('models/user');
const config = require('config.json');

module.exports = refreshToken;

function refreshToken (req, res) {

	userModel.findOne({
		_id: req.userToken.userId
	}).then(user => {
		console.log(user, new Date().getTime() + config.timeToExpireToken);
		var token = jwt.sign({
			userId: user._id,
			domain: user.domain,
			expires: new Date().getTime() + config.timeToExpireToken
		}, config.expiresToken);
		res.send({refreshToken: token});
	}).catch (err => {
		console.log(err);
		res.sendStatus(500);
	});

}