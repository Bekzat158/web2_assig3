const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.username = decoded.username
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

const navbar = (req, res, next) => {
    res.locals.loggedIn = req.cookies.token ? true : false;
    if (req.cookies.token) {
        const decodedToken = jwt.decode(req.cookies.token);
        res.locals.username = decodedToken.username;
        res.locals.admin = decodedToken.isAdmin ? true : false;
        res.locals.language = req.cookies.language || 'english'; // Extract language from cookies
    } else {
        res.locals.admin = false;
        res.locals.language = 'english'; // Set default language
    }
    next();
};
 
const redirectToHomeIfLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Если токен недействителен или его не удалось верифицировать
                res.clearCookie('token');
                return res.redirect('/login');
            } else {
                // Токен верифицирован, перенаправляем на главную страницу
                return res.redirect('/');
            }
        });
    } else {
        // Если токен отсутствует, разрешаем продолжить запрос
        return next();
    }
};

const ifAdmin = (req, res, next) => {
    const token = req.cookies.token;


    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // If token is invalid, clear cookie and redirect to login
            res.clearCookie('token');
            return res.redirect('/login');
        } else {
            // Token is valid, check if user is an admin
            if (decoded.isAdmin) {
                // User is an admin, proceed to the next middleware
                return next();
            } else {
                // User is not an admin, unauthorized access
                return res.status(403).send('Unauthorized Access - Admin Only');
            }
        }
    });

};

const pageNotFound = (req, res, next) => {
    res.status(404).send('<center><h1>404 Not Found</h1></center>'); 
    next();
};

module.exports = { verifyToken, redirectToHomeIfLoggedIn, ifAdmin ,navbar,pageNotFound};
