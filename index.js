require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(express.json());
app.use(cors());

const contentTypeRouter = require('./src/routes/contentTypeRoutes');

const authMiddleware = require('./src/middlewares/authMiddleware');

app.listen(port, () => {
  console.log(`started listening on port ${port}`);
});

app.get('/verify/token', authMiddleware.validateToken, (req, res) => {
  res.send('Hello World!');
});

app.use('/types', authMiddleware.validateToken ,contentTypeRouter);




