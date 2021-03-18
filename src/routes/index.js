const newsRoute = require('./news');
const siteRoute = require('./site');
const userRoute = require('./users');
const adminRoute = require('./admin');

function route(app){
    // for admin
    app.use('/admin/users', userRoute);
    app.use('/admin', adminRoute);

    // for guess
    app.use('/news', newsRoute);
    app.use('/', siteRoute);
}

module.exports = route;