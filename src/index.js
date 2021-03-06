const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//http logger
app.use(morgan('combined'));

//templates engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`EducationBlog listening at http://localhost:${port}`);
});
