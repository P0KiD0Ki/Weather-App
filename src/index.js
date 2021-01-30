// date and time

function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat."];
  let day = days[now.getDay()];

  let months = [
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
  let month = months[now.getMonth()];

  let date = now.getDate();

  let year = now.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}

function theTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

  return `${hours}:${minutes}`;
}

/////////////////
/////////////////
/////////////////
/////////////////
// search engine and temps

function displayTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".wind").innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " mph";
  document.querySelector(".humidity").innerHTML = "Humidity: " + Math.round(response.data.main.humidity) + "%";
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector(".fullDate").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector(".time").innerHTML = theTime(response.data.dt * 1000);
  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  console.log(response.data);
}

function searchEngine(city) {
  let apiKey = "7cae0a9d7005e1c52f2d634f98d69293";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemp);
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector(".textbox").value;
  searchEngine(city);
}

/////////////////
/////////////////
/////////////////
/////////////////
// 7 day forecast
let apiUrlForecast =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33&lon=-84&exclude=minutely,hourly,alerts&appid=16fb7fe8628dfdd6476ce112c8b8470c&units=imperial";

function onLoadForecast(response) {
  document.querySelector(".sun-hi").innerHTML = Math.round(
    response.data.daily[0].temp.max
  );
  document.querySelector(".sun-lo").innerHTML = Math.round(
    response.data.daily[0].temp.min
  );
  document.querySelector(".mon-hi").innerHTML = Math.round(
    response.data.daily[1].temp.max
  );
  document.querySelector(".mon-lo").innerHTML = Math.round(
    response.data.daily[1].temp.min
  );
  document.querySelector(".tues-hi").innerHTML = Math.round(
    response.data.daily[2].temp.max
  );
  document.querySelector(".tues-lo").innerHTML = Math.round(
    response.data.daily[2].temp.min
  );
  document.querySelector(".wed-hi").innerHTML = Math.round(
    response.data.daily[3].temp.max
  );
  document.querySelector(".wed-lo").innerHTML = Math.round(
    response.data.daily[3].temp.min
  );
  document.querySelector(".thur-hi").innerHTML = Math.round(
    response.data.daily[4].temp.max
  );
  document.querySelector(".thur-lo").innerHTML = Math.round(
    response.data.daily[4].temp.min
  );
  document.querySelector(".fri-hi").innerHTML = Math.round(
    response.data.daily[5].temp.max
  );
  document.querySelector(".fri-lo").innerHTML = Math.round(
    response.data.daily[5].temp.min
  );
  document.querySelector(".sat-hi").innerHTML = Math.round(
    response.data.daily[6].temp.max
  );
  document.querySelector(".sat-lo").innerHTML = Math.round(
    response.data.daily[6].temp.min
  );
}
axios.get(apiUrlForecast).then(onLoadForecast);

function showPositon(position) {
  let apiKey = "16fb7fe8628dfdd6476ce112c8b8470c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositon);
}

let textboxInput = document.querySelector("#search-form");
textboxInput.addEventListener("submit", findCity);

let locator = document.querySelector("#button-loc");
locator.addEventListener("click", getLocation);

searchEngine("Atlanta");

/////////////////
/////////////////
/////////////////
/////////////////
// fahr to cels
// function convertFahrenheit(event) {
//   event.preventDefault();
//   document.querySelector("#current-temp").innerHTML =
// }

// function convertCelsius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#current-temp");
//   temp.innerHTML = 3.9;
// }

// let fahr = document.querySelector("#f-link");
// fahr.addEventListener("click", convertFahrenheit);

// let cels = document.querySelector("#c-link");
// cels.addEventListener("click", convertCelsius);
