const express       = require('express');
const accountant    = require('../src/accountant');
const router        = express.Router();

router.post("/register", async (req, res) => {
    let createUser = await accountant.createAccount(req.body);

    if (!createUser.error) {
        res.status(201).json({
            token: createUser.token
        });
    } else {
        res.status(createUser.error).send();
    }
});

router.post("/login", async (req, res) => {
    let loginUser = await accountant.loginAccount(req.body);

    if (!loginUser.error) {
        res.status(200).json({
            token: loginUser.token
        });
    } else {
        res.status(loginUser.error).send();
    }
});

module.exports = router;
