let fetchWeather = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const d = new Date();
dateElement.textContent = `${d.getDate()}, ${monthNames[d.getMonth()]}`;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  locationElement.textContent = "loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  const locationApi = `${fetchWeather}?address=${search.value}`;
  fetch(locationApi).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        if(data.description==='rain' || data.description==='fog'){
            weatherIcon.className = `wi wi-day-${data.description}`
        }else{
            weatherIcon.className = `wi wi-day-cloudy`
        }
        locationElement.textContent = data.cityName;
        tempElement.innerHTML = `${data.temperature}&deg;`;
        weatherCondition.textContent = data.description;
      }
    });
  });
});
