const bcrypt        = require('bcryptjs');
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

const loginAccount = async (user) => {
    let response = {
        error: false,
        token: null
    };

    if (!user.email || !user.password) {
        response.error = 400;
        return response;
    }

    let getPassword = await dbHandler.fetchOne("SELECT password FROM users WHERE email = ?", [user.email]);

    if (!getPassword) {
        response.error = 400;
        return response;
    }

    return bcrypt.compare(user.password, getPassword.password)
        .then(async (res) => {
            if (res) {
                response.token = await auth.generateToken(user.email);
                return response;
            } else {
                response.error = 400;
                return response;
            }
        })
        .catch((err) => {
            response.error = 500;
            return response;
        })
};

module.exports = {
    createAccount,
    loginAccount
}
