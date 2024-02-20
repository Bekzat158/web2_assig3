const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { verifyToken, redirectToHomeIfLoggedIn, ifAdmin,navbar,pageNotFound} = require('./utils/middleware'); 

const app = express();

// Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((navbar));

app.use('/login', redirectToHomeIfLoggedIn, require('./routes/login'));
app.use('/register', redirectToHomeIfLoggedIn, require('./routes/register'));
app.use('/', verifyToken, require('./routes/index'));
app.use('/anime', verifyToken, require('./routes/anime'));
app.use('/movie', verifyToken, require('./routes/movie'));
app.use('/logout', verifyToken, require('./routes/logout'));
app.use('/profile', verifyToken, require('./routes/profile'));
app.use('/history', verifyToken, require('./routes/history'));
app.use('/admin', verifyToken, ifAdmin, require('./routes/admin'));

app.use((pageNotFound));

// Use the PORT environment variable to set the server port
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
