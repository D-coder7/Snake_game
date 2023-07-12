const express = require("express");
const app = express();
const bodyP = require("body-parser");

const compiler = require("compilex");
const options = {stats: true};
compiler.init(options);

app.use(bodyP.json());
app.use("/codemirror", express.static("C:/Users/devan/Downloads/All WebDev Projects/PS-1 Cantilever Labs/snakegame2-master/codemirror"));
app.get("/", function(req, res) {
    res.sendFile("C:/Users/devan/Downloads/All WebDev Projects/PS-1 Cantilever Labs/snakegame2-master/game.html")
});
app.post("/compile", function(req, res) {
    var code = req.body.code;
    try{//if windows  
        var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
        //else
        // var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
        compiler.compileCPP(envData , code , function (data) {
        res.send(data);
    }
    catch(e){
        console.log(error); 
    }
    });
    
    //res is the response object
})

app.listen("8000");