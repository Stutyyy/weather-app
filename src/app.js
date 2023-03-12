// Modules
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const weatherData = require("../utils/weatherData");

const app = express();

// Weather Data


// Port
const port = process.env.PORT || 3000;

// Paths
const publicPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.use(express.static(publicPath))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Express Body
app.get("/", (req, res) => {
  res.render('index',{
    title: 'WeatherApp'
  })
});

// localhost:3000/weather?address=delhi
app.get("/weather", (req, res) => {
  const address = req.query.address
  if(!address) return res.send("Enter Address")
  weatherData(address,(error,{temperature,description,cityName}={})=>{
    if(error) {
      return res.send({error})
    }
    console.log(temperature,description,cityName)
    res.send({temperature,description,cityName})
  });
});

app.get("*", (req, res) => {
  res.render('404',{
    title: 'Page Not Found'
  })
});

// Listen
app.listen(port, () => {
  console.log("listening on port" + port);
});
