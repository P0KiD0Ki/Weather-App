/////
////
///
// date and time formatting

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

// function targetTime(targetTimestampSeconds, targetOffsetSeconds) {
//   let now = new Date();
//   if (targetTimestampSeconds !== null) {
//     now = new Date(targetTimestampSeconds * 1000);
//   }
// }

/////
////
///
// displays

function displayTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " mph";
  document.querySelector(".humidity").innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector(".fullDate").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector(".time").innerHTML = theTime(response.data.dt * 1000);

  let temp = document.querySelector("#current-temp");
  fahrenheitTemp = response.data.main.temp;
  temp.innerHTML = Math.round(fahrenheitTemp);

  let iconId = response.data.weather[0].id;

  placeIcon(iconId);
}

function placeIcon(iconId) {
  let iconElement = document.querySelector("#main-icon");
  let now = new Date();
  let hours = now.getHours();
  let amPm = "";

  if (hours >= 5 && hours < 18) {
    amPm = "day";
  } else {
    amPm = "night";
  }

  iconElement.setAttribute("class", `wi wi-owm-${amPm}-${iconId}`);
}

/////
////
///
// error function

function errorFunction() {
  alert("😬 I love Narnia, but that's not a real place either. Please try again!")
}

/////
////
///
// 7 day forecast

function displayForecast(response) {
  document.querySelector(".sun-hi").innerHTML = Math.round(
    response.data.data[0].app_max_temp
  );
  document.querySelector(".sun-lo").innerHTML = Math.round(
    response.data.data[0].app_min_temp
  );
  document.querySelector(".mon-hi").innerHTML = Math.round(
    response.data.data[1].app_max_temp
  );
  document.querySelector(".mon-lo").innerHTML = Math.round(
    response.data.data[1].app_min_temp
  );
  document.querySelector(".tues-hi").innerHTML = Math.round(
    response.data.data[2].app_max_temp
  );
  document.querySelector(".tues-lo").innerHTML = Math.round(
    response.data.data[2].app_min_temp
  );
  document.querySelector(".wed-hi").innerHTML = Math.round(
    response.data.data[3].app_max_temp
  );
  document.querySelector(".wed-lo").innerHTML = Math.round(
    response.data.data[3].app_min_temp
  );
  document.querySelector(".thur-hi").innerHTML = Math.round(
    response.data.data[4].app_max_temp
  );
  document.querySelector(".thur-lo").innerHTML = Math.round(
    response.data.data[4].app_min_temp
  );
  document.querySelector(".fri-hi").innerHTML = Math.round(
    response.data.data[5].app_max_temp
  );
  document.querySelector(".fri-lo").innerHTML = Math.round(
    response.data.data[5].app_min_temp
  );
  document.querySelector(".sat-hi").innerHTML = Math.round(
    response.data.data[6].app_max_temp
  );
  document.querySelector(".sat-lo").innerHTML = Math.round(
    response.data.data[6].app_min_temp
  );

  console.log(response);
  ///
  // forecast icons

  let sunIcon = document.querySelector("#sun-icon");
  sunIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[0].weather.icon}.png`
  );
  sunIcon.setAttribute("alt", response.data.data[0].weather.description);

  let monIcon = document.querySelector("#mon-icon");
  monIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[1].weather.icon}.png`
  );
  monIcon.setAttribute("alt", response.data.data[1].weather.description);

  let tuesIcon = document.querySelector("#tues-icon");
  tuesIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[2].weather.icon}.png`
  );
  tuesIcon.setAttribute("alt", response.data.data[2].weather.description);

  let wedIcon = document.querySelector("#wed-icon");
  wedIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[3].weather.icon}.png`
  );
  wedIcon.setAttribute("alt", response.data.data[3].weather.description);

  let thursIcon = document.querySelector("#thurs-icon");
  thursIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[4].weather.icon}.png`
  );
  thursIcon.setAttribute("alt", response.data.data[4].weather.description);

  let friIcon = document.querySelector("#fri-icon");
  friIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[5].weather.icon}.png`
  );
  friIcon.setAttribute("alt", response.data.data[5].weather.description);

  let satIcon = document.querySelector("#sat-icon");
  satIcon.setAttribute(
    "src",
    `https://www.weatherbit.io/static/img/icons/${response.data.data[6].weather.icon}.png`
  );
  satIcon.setAttribute("alt", response.data.data[6].weather.description);

}


/////
////
///
//search engine

function searchEngine(city) {
  let apiKey = "7cae0a9d7005e1c52f2d634f98d69293";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemp).catch(errorFunction);

  let forecastKey = "13ce2da2cd2d4da6b6a30677bd0ecc0d";
  let forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${forecastKey}&units=I`;

  axios.get(forecastUrl).then(displayForecast);
}

// function forecastEngine(city) {

// }

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector(".textbox").value;
  searchEngine(city);
}

/////
////
///
//fahrenheit and celsius conversion functions

function convertFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(fahrenheitTemp);
  cels.classList.remove("active");
  fahr.classList.add("active");
}

function convertCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  let tempCelsius = Math.round((fahrenheitTemp - 32) * (5 / 9));
  temp.innerHTML = Math.round(tempCelsius);
  fahr.classList.remove("active");
  cels.classList.add("active");
}

function showPositon(position) {
  let apiKey = "16fb7fe8628dfdd6476ce112c8b8470c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemp);

  let forecastKey = "13ce2da2cd2d4da6b6a30677bd0ecc0d";
  let forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${forecastKey}&units=I`;

  axios.get(forecastUrl).then(displayForecast);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositon);
}

/////
////
///
//global variables

let locator = document.querySelector("#button-loc");
locator.addEventListener("click", getLocation);

let fahrenheitTemp = null;

let textboxInput = document.querySelector("#search-form");
textboxInput.addEventListener("submit", findCity);

let fahr = document.querySelector("#f-link");
fahr.addEventListener("click", convertFahrenheit);

let cels = document.querySelector("#c-link");
cels.addEventListener("click", convertCelsius);

/////
////
///
//displays on load

searchEngine("Atlanta");
