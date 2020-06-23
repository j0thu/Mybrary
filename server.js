if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); // Takes all the variables from the .env file and imports them into the process.env variable
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); //All the views are coming from this directory
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, 
    {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    });


const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose')); //Connecting and opening the database for the first time 



app.use('/', indexRouter);


app.listen(process.env.PORT || 3000);
