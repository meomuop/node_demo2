const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars  = require('express-handlebars');
const db = require('./config/db');
// Connect to DB
db.connect();
const app = express();
const port = 3200;

const route = require('./routes/');

//Set date helper
const hlbars = require('handlebars');
const MomentHandler = require('handlebars.moment');
MomentHandler.registerHelpers(hlbars);
hlbars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

//Set img path
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Debug:
//app.use(morgan('combined'));

// TE: Handlebars
app.engine('hbs', handlebars({
    extname : '.hbs',
    layoutsDir: __dirname + '/resources/views/layouts',
    defaultLayout: 'main',
    partialsDir : __dirname+'/resources/views/partials',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});