const authenticator = require('../src/authenticator');

// Require authentication via JWT
const verifyJwt = async (req, res, next) => {
    if (req.headers.authorization) {
        let data = await authenticator.validateToken(req.headers.authorization);
        if (data) {
            req.decoded = data;
            next();
            return true;
        }
    }
    res.status(401).send();
};

module.exports = verifyJwt;
