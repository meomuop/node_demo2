const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars  = require('express-handlebars');
const app = express();
const port = 3200;

//Set img path
app.use(express.static(path.join(__dirname, 'public')));

// Debug:
app.use(morgan('combined'));

// TE: Handlebars
app.engine('hbs', handlebars({
    extname : '.hbs',
    layoutsDir: __dirname + '/resources/views/layouts',
    defaultLayout: 'main',
    partialsDir : __dirname+'/resources/views/partials',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/news', function (req, res) {
    res.render('news');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});