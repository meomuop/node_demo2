const newsRoute = require('./news');
const siteRoute = require('./site');
const userRoute = require('./users');

function route(app){
    app.use('/users', userRoute);
    app.use('/news', newsRoute);
    app.use('/', siteRoute);
}

module.exports = route;