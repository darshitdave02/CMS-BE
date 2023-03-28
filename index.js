require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
// const helmet = require('helmet');
// app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));
// app.use(helmet.referrerPolicy({ policy: 'strict-origin' }));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

const contentTypeRouter = require('./src/routes/contentTypeRoutes');
const collectionRouter = require('./src/routes/collectionRoutes');

const authMiddleware = require('./src/middlewares/authMiddleware');

app.listen(port, () => {
  console.log(`started listening on port ${port}`);
});

app.get('/verify/token', authMiddleware.validateToken, (req, res) => {
  res.send('Hello World!');
});

app.use('/types', authMiddleware.validateToken, contentTypeRouter);
app.use('/collections', authMiddleware.validateToken, collectionRouter);
