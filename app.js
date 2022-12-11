const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars');
const app = express() 

const route = require('./routes')
const db = require('./database')

db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

route(app)

app.listen(3000)
