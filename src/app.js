const path = require('path');
const express  = require('express');
const app = express();
// const cookieParser = require('cookies-parser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookies
// app.use(cookieParser());

// Public como carpeta estatica
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, console.log('Puero levantado en http://localhost:3000'));

/** Routes */
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);


/****** */