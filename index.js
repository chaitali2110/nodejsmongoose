const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require("./database/db");

// app.get("/",(req,res)=>{
//     res.json({message: "Welcome to Mongoose"});
// })

const routes = require("./routes/routes");
app.use(routes);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Your server is running on port ",port);
})