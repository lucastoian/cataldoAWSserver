//Constants
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const rendertron = require('rendertron-middleware');
const BOTS = rendertron.botUserAgents.concat(['googlebot','yolobot','Chrome-Lighthouse',  'Baiduspider',
'bingbot',
'Embedly',
'facebookexternalhit',
'LinkedInBot',
'outbrain',
'pinterest',
'quora link preview',
'rogerbot',
'showyoubot',
'Slackbot',
'TelegramBot',
'Twitterbot',
'vkShare',
'W3C_Validator',
'WhatsApp']);
const BOT_UA_PATTERN = new RegExp(BOTS.join('|'), 'i');
//errorHandler
const errorHandler = require('./helpers/error-handler');
const history = require('connect-history-api-fallback');
//Cors


app.use(rendertron.makeMiddleware({
  proxyUrl: 'https://cataldostore.appspot.com/render',
  userAgentPattern: BOT_UA_PATTERN
}));

app.use(cors());
app.enable('trust proxy')
//app.use(require('prerender-node').set('prerenderToken', 'p4TrE3U839HAbkLsZeCz'));
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }

    next();
});

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};
// Compress all HTTP responses
app.use(compression({
  // filter: Decide if the answer should be compressed or not,
  // depending on the 'shouldCompress' function above
  filter: shouldCompress,
  // threshold: It is the byte threshold for the response 
  // body size before considering compression, the default is 1 kB
  threshold: 0
}));
app.options('*', cors());




//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use('/public', express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd()+"/dist/apps/cataldo-store"));
app.use(history({
  disableDotRule: true,
  verbose: true
}));
//app.use(express.static(process.cwd()+"/dist/apps/admin"));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const W_productsRoutes = require('./routes/w-products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const variantsRoutes = require('./routes/products-variants');
const W_variantsRoutes = require('./routes/w-products-variants')
const brandsRoutes = require('./routes/brands');
const stripeRoutes = require('./routes/stripe');
const smsRoutes = require('./routes/sms');


const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/women-products`, W_productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/variants`, variantsRoutes);
app.use(`${api}/w-variants`, W_variantsRoutes)
app.use(`${api}/brands`, brandsRoutes);
app.use(`${api}/sms`, smsRoutes);
app.use(`${api}`, stripeRoutes);
/*
app.get('/*', (req, res) => {
  res.sendFile(process.cwd()+"/dist/apps/cataldo-store/index.html");
});


  app.get('/admin', (req,res) => {
    res.sendFile(process.cwd()+"/dist/apps/admin/index.html");
  });  

*/
//Database connection
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Database connection ready...');
}).catch((err) => {
    console.log(err);
})

//Server
app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');

})
