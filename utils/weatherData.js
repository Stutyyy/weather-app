const request = require("request");
const constants = require("../config");

const weatherData = (address, callback) => {
  const url = `${constants.openWeatherMap.url}${encodeURIComponent(
    address
  )}&units=metric&appid=${constants.openWeatherMap.apiKey}`;
  request({url,json:true},(error,{body})=>{
    if(error) {
        callback("error with api",undefined)
    }else if(!body.list[0].main || !body.list[0].main.temp || !body.list[0].name || !body.list[0].weather[0].description) {
      callback("Unable to find required data, try another location", undefined);}
    else{
        callback(undefined,{
            temperature:body.list[0].main.temp,
            description:body.list[0].weather[0].description,
            cityName:body.list[0].name
        })
    }
  })
};

module.exports = weatherData;
