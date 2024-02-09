const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/routes.js');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//error handler
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

//routes
app.use('/', routes);

module.exports = app;
