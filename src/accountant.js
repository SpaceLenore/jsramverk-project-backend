const auth          = require('./authenticator');
const dbHandler     = require('../db/handler');
const saltRounds    = 10;

const createAccount = (user) => {
    let response = {
        error: false,
        token: null
    };

    if (!user.name || !user.email || !user.password) {
        response.error = 400;
        return response;
    }

    return bcrypt.hash(user.password, saltRounds)
        .then(async (hash) => {
            await dbHandler.exec("INSERT INTO users(name, email, password) VALUES (?,?,?)", [user.name, user.email, hash]);
            //Create token
            try {
                response.token = await auth.generateToken(user.email);
                return response;
            } catch (e) {
                response.error = 500;
                return response;
            }
            response.token = "mytoken";
            return token;
        })
        .catch((err) => {
            response.error = 500;
            return response;
        })
}

const loginAccount = (user) => {
    let response = {
        error: false,
        token: null
    };

    if (!user.email || !user.password) {
        response.error = 400;
        return response;
    }

    return bcrypt.hash(user.password, saltRounds)
        .then(async (hash) => {
            try {
                let getPassword = await auth.fetchOne("SELECT password FROM users WHERE email = ?", [user.email]);
                if (getPassword === hash) {
                    return
                } else {
                    response.error = 400;
                    return response;
                }
            } catch (e) {

            }
        })
        .catch((err) => {
            response.error = 500;
            return response;
        })
};

module.exports = {
    createAccount
}
