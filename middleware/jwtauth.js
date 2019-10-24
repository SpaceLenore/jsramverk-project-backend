const authenticatior = require('../src/authenticator');

// Require authentication via JWT
const verifyJwt = async (req, res, next) => {
    if (req.headers.authorization) {
        if (await authenticator.validateToken(req.headers.authorization)) {
            next();
            return true;
        }
    }
    res.status(401).send();
};

module.exports = verifyJwt;
