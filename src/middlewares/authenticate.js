const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token =
		req.headers.authorization && req.headers.authorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, "YourSecretKey");
		console.log("Helloo",decoded)
		req.user = decoded;
		// console.log(req.user)
		next();
	} catch (error) {
		return res.status(403).json({ message: "Invalid token", error });
	}
};

module.exports = authenticate;
