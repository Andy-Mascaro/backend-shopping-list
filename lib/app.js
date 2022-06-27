const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://alchemy-shopping-front-end-demo.netlify.app'],
    credentials: true,
  })
);

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/items', require('./controllers/items'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
