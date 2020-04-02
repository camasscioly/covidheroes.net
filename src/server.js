require('dotenv').config();

const express = require('express');
const Keyv = require('keyv');
 
const { join } = require('path');

const v1Routes = require('./../controllers/v1.js');
const rootRoutes = require('./../controllers/index.js');

const app = express();

app.enable('trust proxy', true);

app.disable('view cache');
app.set('view engine', 'ejs'); 
app.set('views', join(__dirname, './../views'));

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
app.use(rootRoutes);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));