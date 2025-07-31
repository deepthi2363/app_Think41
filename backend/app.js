const express = require('express');
const app = express();

const departmentsRoute = require('./routes/departments');

app.use(express.json());
app.use('/api/departments', departmentsRoute);

module.exports = app;
