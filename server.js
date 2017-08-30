/* jshint esversion: 6 */
const express = require('express');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');
const randomstring = require('randomstring');
const bodyParser = require('body-parser');

const app = express();

const data = [
  {
    longUrl: 'http://google.com',
    id: randomstring.generate(6)
  }
];

const authMiddleware = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
});

const bodyParserMiddleware = bodyParser.urlencoded({ extended: false});

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(morgan('tiny'));

app.get('/', authMiddleware, (req, res) => {
  res.render('index.ejs', {data});
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const matched = data.find(item => item.id === id);
  if(matched) {
    res.redirect(301, matched.longUrl);
  } else {
    res.status(404);
    res.send('404 Not Found');
  }
});

app.post('/', authMiddleware, bodyParserMiddleware, (req, res) => {
  const longUrl = req.body.longUrl;
  let id;
  while(true) {
    const candidate = randomstring.generate(6);
    const matched = data.find(item => item.id === candidate);
    if(!matched) {
      id = candidate;
      break;
    }
  }
  data.push({id, longUrl});
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('listening...');
});
