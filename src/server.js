require('dotenv').config();

const express = require('express');
const Keyv = require('keyv');
 
const { join } = require('path');

const v2Routes = require('./../controllers/v2.js');
const rootRoutes = require('./../controllers/index.js');

const app = express();

app.enable('trust proxy', true);

app.disable('view cache');
app.set('view engine', 'ejs'); 
app.set('views', join(__dirname, './../views'));

app.use(require('express-boom')());
app.use(require('cors')());
app.use(require('compression')());
app.use(require('helmet')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('morgan')('combined'));
app.use(express.static('public'));

app.use(
  '/v2',
  require('express-rate-limit')({
    windowMs: 10000,
    max: 50,
    headers: true,
    handler: (_req, res) => {
      res.boom.tooManyRequests();
    },
  })
);

app.use('/v2', v2Routes);
app.use(rootRoutes);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));