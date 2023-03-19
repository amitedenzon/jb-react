const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');
const { passport } = require('./auth');
console.log(passport);
const app = express()
const port = 3000
const host = 'localhost';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/dashboard', (req, res) => {
res.send('Dashboard')
})

app.get('/login', (req, res) => {
    res.render('index');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})
