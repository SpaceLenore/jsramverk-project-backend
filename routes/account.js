const express       = require('express');
const handler    = require('../db/handler');
const router        = express.Router();

router.get("/wallets", async (req, res, next) => {
    let wallets = await handler.fetchAll("SELECT * FROM wallets WHERE owner = ?", [req.decoded.email]);
    res.status(200).json(wallets);
});

router.get("/funds", async (req, res, next) => {
    let funds = await handler.fetchOne("SELECT funds FROM users WHERE email = ?", [req.decoded.email])
    res.status(200).json(funds);
});

module.exports = router;
