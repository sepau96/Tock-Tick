const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer'); 

const express = require('express');

const routes = require('../routes/index');
const erroHandler = require('errorhandler');



module.exports = app => {
    app.set('port',process.env.PORT || 3000);

    app.set('views', path.join(__dirname, '../views'));

    //Motor de renderización
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));

    //Aplica el motor de handlebars
    app.set('view engine', '.hbs');

    //Middlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname,'../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    //Routes
    routes(app);

    //static files
    app.use('/public',express.static(path.join(__dirname, '../public')));

    //Error 404
    app.use(function (req, res) {
        if (res.status(404)) {
            res.render('404');
        }
      });


    //Error handler
    if('development' === app.get('env')){
        app.use(erroHandler);
    }
   

    return app;
}