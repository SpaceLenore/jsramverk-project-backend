const express       = require('express');
const trade         = require('../src/trader');
const router        = express.Router();

router.get("/stonks", async (req, res) => {
    let stonks = await trade.getStonks();

    if (!stonks.error) {
        res.status(200).json(stonks.data);
    } else {
        res.status(stonks.error).send();
    }
});

router.post("/buy", async (req, res) => {
    req.body.buyer = req.decoded.email;;
    let buy = await trade.buyStonks(req.body);

    if (!buy.error) {
        res.status(202).send();
    } else {
        res.status(buy.error).send();
    }
});


router.post("/sell", async (req, res) => {
    req.body.seller = req.decoded.email;
    let sell = await trade.sellStonks(req.body);

    if (!sell.error) {
        res.status(202).send();
    } else {
        res.status(sell.error).send();
    }
});

module.exports = router;
