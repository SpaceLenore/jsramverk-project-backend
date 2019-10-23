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

});

module.exports = router;
