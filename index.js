// require('rootpath')();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');

const {fetchLinks} = require('./svc/_fetchLinks');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/algo', router);

app.use(errorHandler);

router.post('/contentLinks', trigger);

// const testUrl = 'https://www.africanews.com/'
// 'https://www.theatlantic.com/international/archive/2020/01/prince-harry-meghan-markle-hypocrisy-royals/604714/'
// fetchLinks(testUrl)

async function trigger (req, res, next) {
  const {url} = req.body
  const response = await fetchLinks(url)
  res.send(response)
}

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
