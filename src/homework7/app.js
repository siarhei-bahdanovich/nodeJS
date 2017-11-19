import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportStrategies from './middlewares/passport-strategies';

import queryStringParser from './middlewares/query-string-parser';
import cookieParser from './middlewares/cookie-parser';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cityRoutes from './routes/cityRoutes';

passportStrategies(passport);
var app = express();

// middlewares
app.use(queryStringParser);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'somesecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routes
authRoutes(app);
productRoutes(app);
userRoutes(app);
cityRoutes(app);

export default app;