const express = require("express");
const app = express();
require("dotenv").config();;
app.use(express.json());
const cors = require("cors");
app.use(cors());
const userRoute = require("./route/userRoute")
const dbConfig = require("./config/dbConfig");
const loginRoute = require("./route/loginRoute")


const port = process.env.PORT || 5000;

app.post("/register",  userRoute);
app.post("/login",  loginRoute);

app.get("/", (req,res) => res.send("API is runing..."));

app.listen(port, () => console.log(`node epress server started on ${port}`))
