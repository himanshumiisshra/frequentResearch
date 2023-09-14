const express = require("express");
const app = express();
const mongoose = require('mongoose')
require("dotenv").config();;
app.use(express.json());
const cors = require("cors");
app.use(cors());
const userRoute = require("./route/userRoute")
const dbConfig = require("./config/dbConfig");
const loginRoute = require("./route/loginRoute");
const userModel = require("./models/userModel");


const port = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://himanshu90210:Bhumbumbhole1@cluster90210.1phpfjw.mongodb.net/form")


app.get('/getUsers', (req,res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json)
})

app.post("/register",  userRoute);
app.post("/login",  loginRoute);

app.get("/", (req,res) => res.send("API is runing..."));

app.listen(port, () => console.log(`node epress server started on ${port}`))
