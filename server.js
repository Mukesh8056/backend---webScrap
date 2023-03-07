const express = require('express');

const app = express();

const mongoose = require('mongoose')

// const a_c = require("../backend/src/controller/a_controller") // to test specific controller

require('dotenv').config()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');

const corsOption ={
    original:"http://localhost:3000/"
};

app.use(cors(corsOption))

const Schema= require("./src/router/router")

app.use("/api", Schema)

// app.get("/demo",a_c) // to test and get console

app.use (express.json())

app.use(express.urlencoded({extended:false}));


const PORT = process.env.PORT || 8081;

const uri = process.env.ATLAS

mongoose.connect(uri, {useNewUrlParser:true})

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("DATABASE IS CONNECTED");
})


app.listen(PORT,()=>{

    console.log(`SERVER IS RUNNING IN ${PORT}`);
})

app.get("/",(req,res)=>{

    res.send({message:"welcome to fsd"})
})





