const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const weatherRouter = require('./router/weatherrouter.js'); 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/weather', weatherRouter);


app.listen(3000, function(){
    console.log("app is runnning on 3000")
})