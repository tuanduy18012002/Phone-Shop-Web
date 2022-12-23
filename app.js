const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars');
const app = express() 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const route = require('./routes')
const db = require('./database')

db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(session({secret: "Your secret key"}));
app.use(cookieParser())


route(app)

app.listen(3000)