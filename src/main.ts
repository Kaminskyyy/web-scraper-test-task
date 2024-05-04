import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { initializeDataSource } from './db/app-data-source.js';
import session from 'express-session';
import passport from 'passport';
import errorHandlingMiddleware from './middleware/error-handling-middleware.js';
import authRoutes from './auth/auth.controller.js';
import parseRoutes from './parse/parse.controller.js';
import './auth/strategies/local.strategy.js';
import './auth/strategies/jwt.strategy.js';
initializeDataSource().then();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use(parseRoutes);
app.use(errorHandlingMiddleware);

const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
