require('dotenv').config();

// imports
const express = require('express');
const { join } = require('path');
const i18next = require('i18next')
const i18nextMiddleware = require('i18next-http-middleware')
const pino = require('pino');
//const expressPinoLogger = require('express-pino-logger');

const v1Routes = require('./../controllers/v1.js');
const externalRoutes = require('./../controllers/external.js');
const rootRoutes = require('./../controllers/index.js');

// setup
//const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
//const expressLogger = expressPinoLogger({ logger });
i18next.use(i18nextMiddleware.LanguageDetector).init({
  preload: ['en', 'es', 'it'],
  debug: true,
  resources: {
    it: {translation: require('./../locales/it')},
  }
})

const app = express();

app.enable('trust proxy', true);
app.disable('view cache');
app.set('view engine', 'ejs');
app.set('views', join(__dirname, './../views'));
// If process.env.PORT is blank, default to port 3000
app.set('port', process.env.PORT || 3000)

//app.use(expressLogger);
app.use(i18nextMiddleware.handle(i18next));
app.use(require('express-boom')());
app.use(require('cookie-parser')());
app.use(require('cors')());
app.use(require('compression')());
app.use(require('helmet')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('morgan')('dev'));
app.use(express.static('public'));
app.use(
  require('express-session')({
    secret: 'covidheroes',
    cookie: { maxAge: 60000 },
  })
);
app.use(
  '/v1',
  require('express-rate-limit')({
    windowMs: 1000,
    max: 1000,
    headers: true,
    handler: (_req, res) => {
      res.boom.tooManyRequests();
    },
  })
);

app.use('/v1', v1Routes);
app.use('/r', externalRoutes);
app.use(rootRoutes);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
