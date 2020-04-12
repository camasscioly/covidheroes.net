require('dotenv').config();

const App = require('./App.js');
const app = new App(process.env.PORT);

app.start();
