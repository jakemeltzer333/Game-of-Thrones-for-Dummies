const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


app.get('/', (req,res) => {
  res.render('index', {
    message: 'Game of Thrones For Dummies',
    currentPage: 'home',
    documentTitle: 'Game of Thrones For Dummies',
  });
});

const gotRoutes = require('./routes/got-routes');
app.use('/got', gotRoutes);
// const authRoutes = require('./routes/auth-routes');
// app.use('/auth', authRoutes);
// const userRoutes = require('./routes/user-routes');
// app.use('/user', userRoutes);

app.get('*', (req, res) => {
  res.status(400).send('Page Not Found');
});
