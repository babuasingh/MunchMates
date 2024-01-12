require('dotenv').config()
const express = require('express');
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const  mongoDB  = require('./db.js');
const BASE_URL = process.env.BASE_URL
mongoDB()
const PORT=process.env.PORT || 4000;
const cors = require('cors');
app.use(cors()) 
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",`https://munchmates.netlify.app`);
    res.header(
        "Access-Control-Allow_headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})



app.get('/',(req,res)=>{
    res.send("<h1> This is the home page </h1>")
})
app.use('/api',require('./Routes/CreateUser.js'))
app.use('/api',require('./Routes/DisplayData.js'))
app.use('/api',require('./Routes/OrderData.js'))


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
