//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

//it implies that server is getting the data to the home page of the 3000 from client website
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const cityName = req.body.CityName;
    console.log(cityName);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=544e3c4674120e8eb4be6797a159ca46&units=metric";
    https.get(url,function(response){//if query is in url format use this
        console.log(response.statusCode);

        response.on("data",function(data){
            // console.log(data); -->gives hexa decimal
            // console.log(typeof data);
            const weatherData = JSON.parse(data);
            // console.log(typeof weatherData); 
            //both are objects but if we are using the https use parse
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            //no need to write again the image https 
            console.log(temp);
            console.log(desc);
            res.write("<p>The overview of the weather in "+cityName+" is : "+desc+"</p>");
            res.write("<h1>The temperature in "+cityName+" now is : "+temp+"</h1>"); 
            res.write("<img src="+imageURL+">");
            //posts the data beacuse it is a readymade data -->imp 
            //but if we furtuer need to manupliate the data by user like calculator then use post method
            // console.log(weatherData);
            res.send();
            //example
            // var myClass = {
            //     name : "Harsha",
            //     age : 20,
            //     class : "ramen"
            // };
            // const temp = JSON.stringify(myClass);
            // console.log(temp);
        });
    });
    // res.send("Server is set up and is running");//only one send is used -->used as post here so comment
    //in 
});

app.listen(3000,function(){
    console.log("Reading from the port number 3000");
});

