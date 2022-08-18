const express = require("express");

const app = express();
app.use(express.static(__dirname + "/src"));
app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});