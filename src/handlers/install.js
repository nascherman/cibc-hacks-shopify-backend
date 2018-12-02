const ShopifyToken = require('shopify-token');

const { API_KEY, API_SECRET, APP_URL } = require('../../config/auth');

const scopes = require('../../config/scopes');

const shopifyToken = new ShopifyToken({
    apiKey: API_KEY,
    sharedSecret: API_SECRET,
    redirectUri: 'http://localhost:8080/auth',
    scopes
});

module.exports.get = (req, res, next) => {
    const { hmac, shop, timestamp } = req.query;

    //
    // Generate a random nonce.
    //
    const nonce = shopifyToken.generateNonce();

    //
    // Generate the authorization URL. For the sake of simplicity the shop name
    // is fixed here but it can, of course, be passed along with the request and
    // be different for each request.
    //
    const uri = shopifyToken.generateAuthUrl(shop.split('.')[0], undefined, nonce);

    //
    // Save the nonce in the session to verify it later.
    //
    // req.session.state = nonce;
    res.send(uri);
};