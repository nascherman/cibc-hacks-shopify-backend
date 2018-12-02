const allowedHeaders = [
    'Accept',
    'Accept-Encoding',
    'Access-Control-Request-Headers',
    'Access-Control-Request-Method',
    'Cache-Control',
    'Connection',
    'Content-Type',
    'Host',

];

module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    } else {
        next();
    }
};