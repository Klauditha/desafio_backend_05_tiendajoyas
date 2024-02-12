const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes.js');
const middleware = require('./middlewares/error.handlers.js');

//middleware
app.use(cors());

app.use(express.json());

//routes
app.use('/', routes);

//error handler
app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
