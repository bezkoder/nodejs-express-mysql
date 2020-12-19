// To handle all routes from one file, making it more scalable 

const router = require('express').Router();
const customerRoute = require('./customer.routes.js');

// Adding customer routes - can add more routes here
router.use('/customers', customerRoute);

module.exports = router