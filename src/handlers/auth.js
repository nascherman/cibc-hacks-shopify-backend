const ShopifyToken = require('shopify-token');

const {API_KEY, API_SECRET, APP_URL, REDIRECT_URI} = require('../../config/auth');

const scopes = require('../../config/scopes');

const shopifyToken = new ShopifyToken({
    apiKey: API_KEY,
    sharedSecret: API_SECRET,
    redirectUri: `${REDIRECT_URI}/auth`,
    scopes
});

module.exports.get = (req, res, next) => {

    const {code, shop, hmac, state, timestamp} = req.query;

    shopifyToken.getAccessToken(shop, code).then((token) => {
        console.log('TOKEN', token);
        res.send(`
<html>
<head>
    <title>Authorize CIBC App</title>
</head>
<body>
<script>
    window.opener.postMessage({
        accessToken: "${token}",
        shop: "${shop}"
    }, '*')
    // window.opener.postMessage('access-token:${token.toString()}','*');
    window.close();
</script>
</body>
</html>
`);
    }).catch((err) => console.err(err));

};