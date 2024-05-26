const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
/*const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'neurotal',
  password: 'Neuro@123',
  port: 5432,
});*/

// if (!process.env.JWT_SECRET_KEY) {
//   console.log(`FATAL ERROR: Auth key is absent!`);
//   process.exit();
// }

//require('./helpers/changeStatusAfterDeactivation');
//require('./helpers/index.js');

// MIDDLESWARES
app.use(
  cors({
  /*  origin: [
      'http://13.237.14.155:5000',
      'http://13.237.14.155:5000/',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3500',
      'http://localhost:3500',
    ],*/
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.hsts());
app.use(helmet.frameguard());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy());


// SETTING THE VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

// SETTING PUBLIC FOLDER
app.use(express.static(`${__dirname}/public`));

// MOUNTING ROUTES HERE
const routes = require('./routes/routes.js');
app.use('/', routes);

// app.all('/*', function (req, res, next) {
//   res.status(403).send({
//     message: 'Access Forbidden',
//   });
// });


module.exports = app;
