/* jshint esversion: 6 */
const express = require('express');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');

const app = express();

const data = [
  {
    longUrl: 'http://google.com',
    id: '58DX37'
  }
];

app.use(basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}));

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
// http logger
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('index.ejs', {data});
});

app.listen(3000, () => {
  console.log('listening...');
});
