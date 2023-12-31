const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.set('port', PORT);
app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);



app.get("/", (req, res) => {
  // console.log(`Id = ${req.session.id} and Logged in is ${req.session.loggedIn}`)
  
  res.render("index", {loggedIn: req.session.loggedIn})
})

app.get("/login", (req, res) => {
  res.render("login",{ loggedIn: req.session.loggedIn})
})

app.get("/signup", (req, res) => {
  res.render("signup", { loggedIn: req.session.loggedIn})
})

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/');
    }
  });
})

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { loggedIn: req.session.loggedIn})
})

app.get("/blog", (req, res) => {
  res.render("blogpost", { loggedIn: req.session.loggedIn})
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

