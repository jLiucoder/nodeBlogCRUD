// import express to the project, and call it express
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const key = require('./connectionString')

const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs')
// set var app as express app
const app = express()
//connect to MONGODB
const DBURI = key

mongoose.connect(DBURI).then(() => {
    app.listen(3000)
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

//register view engine
app.set('view engine', 'ejs')

// listen for request, the number 3000 is the port number

//middleware & static files
app.use(express.static('public'))
// add this part to have the post request
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))



// controlling routes, '/' means the home directory, '/about' is costmoized
// put the status code 404 code portion at the end to make sure every other one is not accessible.

//since we are using ejs here, so what we need is render instead of sendFile for HTML files
app.get('/', (req,res)=>{
    res.redirect('/blogs')
    // res.render('index',{title: 'Home', blog})
})

app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'})
})

//blog routes
app.use('/blogs',blogRoutes)

// 404 must be at the bottom of the handlers
app.use((req,res)=>{
    res.status(404).render('404', {title: '404'})
})
