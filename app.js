const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars');
const app = express() 

<<<<<<< HEAD
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin/admin');

=======
const route = require('./routes')
const db = require('./database')
>>>>>>> f4898c95b2bbce65ac9f1a8360303df7bc209859

db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

route(app)

<<<<<<< HEAD
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});
=======
app.listen(3000)
>>>>>>> f4898c95b2bbce65ac9f1a8360303df7bc209859
