const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const middleware = require('./middlewares/error.handlers.js');

//middleware
app.use(cors());

//middleware morgan
app.use(
  morgan(
    '\nHoy :date[iso] \nSe ha recibido una petición :method con la siguiente URL\n :url  \nEstado: :status '
  )
);

app.use(express.json());

//routes
app.use('/', routes);

//error handler
app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
