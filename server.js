require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const connectDB=require('./config/db');


//parse requests
app.use(bodyParser.json());

//db
connectDB();

//routes
app.use('/api/users', require('./routes/api/user'))

const port=5000;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})