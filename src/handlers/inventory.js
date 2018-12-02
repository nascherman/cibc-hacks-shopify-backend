const Shopify = require('shopify-api-node');
const {API_KEY, API_SECRET, APP_URL} = require('../../config/auth');

module.exports.get = (req, res, next) => {
    const { access_token, shop } = req.query;
    const shopify = new Shopify({
        shopName: shop,
        accessToken: access_token
    });


    const listingResponse =  shopify.product.list()
        .then(response => {
            const mappedResponses = response.map(item => mapItems(item));

            const itemToSell = mappedResponses.sort((a, b) => {
                return (a.inventory * a.price) < (b.inventory * b.price);
            })[0];

            res.send(itemToSell);
            // res.send(response);
        });

    // console.log('Product listing', listingResponse);
};

function mapItems(item) {
    const inventory = item.variants.reduce((acc, curr) => {
        return acc + curr.inventory_quantity;
    }, 0);

    return {
        id: item.variants[0].id, // hack for setting id later in the flow
        title: item.title,
        price: item.variants[0].price,
        discount: item.variants[0]['compare_at_price'],
        inventory,
        imageURL: item.image ? item.image.src : null // get first variant image
    };
}