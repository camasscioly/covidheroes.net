require('dotenv').config();

const App = require('./App.js');
const app = new App(process.env.PORT, process.env.NODE_ENV);

app.start();
