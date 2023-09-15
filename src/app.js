const path = require('path');
const express  = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.listen(3000, console.log('Puerto levantado en http://localhost:3000'));

  // Cookies
  app.use(cookieParser());

/**** Mis middle ****/
const autoLogged = require('./middlewares/autoLogged');
app.use(autoLogged);

const loggedMiddle = require('./middlewares/loggedMiddleware');
app.use(loggedMiddle);


// Public como carpeta estatica
app.use(express.static(path.join(__dirname, 'public')));


/** Routes */
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);


/****** */