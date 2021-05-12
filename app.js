const express=require("express");
const app=express()
const bodyParser=require("body-parser")
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
  res.sendFile(__dirname +"/index.html");
//
  })

app.post('/',(req,res)=>{
  const city=req.body.city;
  const apiKey="d98996729c7f1872f5014a882b18ba63";

  console.log("FROM POSTMAN");
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;

  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherDet=JSON.parse(data);
      const desc=weatherDet.weather[0].description
      const temp=weatherDet.main.temp
      const humidity=weatherDet.main.humidity
      const name=weatherDet.name
      const img="http://openweathermap.org/img/wn/"+weatherDet.weather[0].icon+"@2x.png"
      res.write("<h1>The weather at "+name+" is "+desc+"</h1>");
      res.write("<p>The temperature is "+temp+" and humidity levels at "+humidity+"</p>");
      res.write("<img src='"+img+"' width='500px' height='500px'/>'");

   })
 })
})
var port=process.env.PORT||3000
app.listen(port,function(){
  console.log("Listening on port 3000");
})
