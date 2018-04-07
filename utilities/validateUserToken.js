const jwt = require('jsonwebtoken');
const config = require('config.json');

module.exports = (req, res, next) => {

	jwt.verify(req.headers.usertoken, config.userTokenSecret, (err, decoded) => {
		if (err) {
			res.status(401).send("Unauthorized!");
			return;
		}
        //Si es correcto el token añadimos la informacion al req
        req.userToken = decoded;
        next();
    });
	
}