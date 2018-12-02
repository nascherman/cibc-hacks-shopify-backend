const Shopify = require('shopify-api-node');
const {API_KEY, API_SECRET, APP_URL} = require('../../config/auth');

module.exports.post = (req, res, next) => {
    const {
        id,
        accessToken,
        shop,
        price,
        compare_at_price
    } = req.body;

    const shopify = new Shopify({
        shopName: shop,
        accessToken
    });

    shopify.productVariant.update(id, {
        compare_at_price,
        price
    }).then(response => {
        console.log('RES', response);
        res.send(response);
    })
        .catch(e => {
            console.log('Error', e);
            next(e);
        })
};