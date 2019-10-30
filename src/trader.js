const handler = require('../db/handler');

const getStonks = () => {
    let response = {
        error: false,
        data: null
    }
    return handler.fetchAll("SELECT * FROM stonks", [])
    .then((res) => {
        response.data = res;
        return response;
    })
    .catch((err) => {
        response.error = 500;
        return response;
    });
}

const buyStonks = async (buying) => {
    let response = {
        error: false
    };

    if (buying === undefined) {
        response.error = 400;
        return response;
    }
    if (
        !buying.id ||
        !buying.price ||
        !buying.amount ||
        !buying.buyer
    ) {
        response.error = 400;
        return response;
    }

    let amountLeft, companyName = await handler.fetchOne("SELECT name, shares FROM stonks WHERE id = ?", [buying.id])
    .then((res) => {
        let name = res.name.toLowerCase().replace(/\W/g, '');
        return res.shares, name;
    })
    .catch((err) => {
        return 0;
    })

    if (buying.amount > amountLeft) {
        response.error = 409;
        return response;
    }

    let userMoney = await handler.fetchOne("SELECT funds FROM users WHERE email = ?", [buying.buyer])
    .then((res) => {
        return res.funds;
    })
    .catch((err) => {
        return 0;
    });

    if (userMoney < buying.prize) {
        response.error = 400;
        return response;
    }

    try {
        await handler.exec("UPDATE stonks SET shares=shares-? WHERE id = ?", [buying.amount, buying.id]);
        await handler.exec("UPDATE users SET " + companyName + "= " + companyName + "+? WHERE email = ?;", [buying.amount, buying.buyer]);
        await handler.exec("UPDATE users SET funds = funds - ? where email = ?", [buying.price * buying.amount, buying.buyer]);
        return response;
    } catch (e) {
        response.error = 500;
        return response;
    }

    return response;
}

module.exports = {
    getStonks,
    buyStonks
}
