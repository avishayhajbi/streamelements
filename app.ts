const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import indexRouter from './routes';
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    req.setTimeout(0);
    next();
})
app.use('/', indexRouter);

export default app;
