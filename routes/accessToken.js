const jwt = require('jsonwebtoken');
const config = require('config.json');

module.exports = accessToken;

function accessToken (req, res) {

	try {

		if (!req.headers.authorization) {
			throw new Error("Not refresh token!");
		}

		jwt.verify(req.headers.authorization, config.refreshTokenSecret, (err, decoded) => {

			try {
				if (err) {
					throw err;
				}

				if (decoded.exp < Date.now() / 1000) {
					throw "Expired Token";
				}

				var token = jwt.sign({
					userId: decoded.userId,
					domains: decoded.domains
				}, config.accessTokenSecret, { expiresIn: config.expiresTimeAccessToken });

				res.send({accessToken: token});

			} catch(err) {
				console.log(err);
				res.sendStatus(401);
			}

		});

	} catch (err) {
		console.log(err);
		res.sendStatus(401);
	}

}



