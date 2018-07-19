const jwt = require('jsonwebtoken');
const config = require('config.json');

module.exports = accessToken;

function accessToken (req, res) {

	try {

		if (!req.body.hasOwnProperty('domain') ||
			!req.body.hasOwnProperty('token')) 
		{
			throw new Error("Not hasOwnProperty");
		}

		jwt.verify(req.body.token, config.accessTokenSecret, (err, decoded) => {

			try {
				
				if (err) {
					throw err;
				}

				if (decoded.exp < Date.now() / 1000) {
					throw new Error("Expired Token");
				}

				if (!decoded.domains.includes(req.body.domain)){
					throw new Error("Not access to domain");
				}
				
				res.send({userId: decoded.userId});

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



