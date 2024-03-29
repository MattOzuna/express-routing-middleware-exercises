const express = require("express")
const expressError = require('./expressError')
const morgan = require('morgan')
const routes = require('./routes');
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

app.use(morgan('dev'))

app.use('/items', routes)

app.use((req,res,next) => {
    const notFoundError = new ExpressError('Not Found', 404)
    return next(notFoundError)
})

app.use((err, req, res, next) => {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
      return res.status(status).json({
      error: {message, status}
    });
  });

module.exports = app