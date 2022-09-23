let now = new Date();
function formatDate() {
  let date = now.getDate();
  let month = now.getMonth();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthChall1 = months[now.getMonth()];
  let correctDay = days[now.getDay()];
  return `${correctDay} - ${monthChall1} ${date}`;
}
let currentDate = document.querySelector("h1");
currentDate.innerHTML = formatDate(new Date());

function formatTime() {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  return `${hours}:${minutes} ${ampm}`;
}
let currentHours = document.querySelector(".time-head");
currentHours.innerHTML = formatTime(new Date());

let search = document.querySelector(".search-btn");
search.addEventListener("click", searchTown);

// --------------------Search--------------------
function searchTown(event) {
  event.preventDefault();
  let dataTown = document.querySelector("#search");
  let town = document.querySelector(".location-item");
  if (dataTown.value) {
    town.innerHTML = `${dataTown.value}`;
    let apiKey = "366c10bcb6394de49050d3d5f0ee5608";
    let city = dataTown.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  } else {
    town.innerHTML = null;
    town.innerHTML = "Please type a city name";
  }
}

function searchWeather(city) {
  let apiKey = "366c10bcb6394de49050d3d5f0ee5608";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
// -------------------------Forecast----------------------

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  let forecastHTML = `<div class="row weather-forecast" >`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="day-week col first">
              <h2 class="day-week-call">${day}</h2>
                 <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
              <p class="current-degrees"><span>18 °</span><span>25 °</span></p>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "366c10bcb6394de49050d3d5f0ee5608";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationItem = document.querySelector(".location-item");
  let currentDegreesmin = document.querySelector(".degreesmin-temperature");
  let currentDegreesmax = document.querySelector(".degreesmax-temperature");
  let windSpeed = document.querySelector("#wind-speed");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity-value");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  currentDegreesmax.innerHTML = Math.round(response.data.main.temp_max);
  currentDegreesmin.innerHTML = Math.round(response.data.main.temp_min);
  locationItem.innerHTML = response.data.name;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  description.innerHTML = response.data.weather[0].description;
  celsiusTemperaturemin = response.data.main.temp_min;
  celsiusTemperaturemax = response.data.main.temp_max;

  // ------------------Change icons----------------------

  let weatherNumber = response.data.weather[0].id;

  let weatherIcon;
  switch (weatherNumber) {
    case (200, 201, 202, 210, 211, 212, 221, 230, 231, 232):
      weatherIcon = document.querySelector("#icon").src = "img/thunder.svg";
      break;
    case (300, 301, 302, 310, 311, 312, 313, 314, 321):
      weatherIcon = document.querySelector("#icon").src = "img/rainy-7.svg";
      break;
    case 500:
      weatherIcon = document.querySelector("#icon").src = "img/rainy-1.svg";
      break;
    case 501:
      weatherIcon = document.querySelector("#icon").src = "img/rainy-2.svg";
      break;
    case 502:
      weatherIcon = document.querySelector("#icon").src = "img/rainy-3.svg";
      break;
    case 503:
      weatherIcon = document.querySelector("#icon").src = "img/rainy-4.svg";
      break;
    case (504, 511):
      weatherIcon = document.querySelector("#icon").src = "img/rainy-5.svg";
      break;
    case (520, 521, 522, 531):
      weatherIcon = document.querySelector("#icon").src = "img/rainy-6.svg";
      break;
    case 600:
      weatherIcon = document.querySelector("#icon").src = "img/snowy-1.svg";
      break;
    case 601:
      weatherIcon = document.querySelector("#icon").src = "img/snowy-2.svg";
      break;
    case 602:
      weatherIcon = document.querySelector("#icon").src = "img/snowy-3.svg";
      break;
    case 611:
      weatherIcon = document.querySelector("#icon").src = "img/snowy-4.svg";
      break;
    case 612:
      weatherIcon = document.querySelector("#icon").src = "img/snowy-5.svg";
      break;
    case (613, 615, 616, 620, 621, 622):
      weatherIcon = document.querySelector("#icon").src = "img/snowy-6.svg";
      break;
    case 800:
      weatherIcon = document.querySelector("#icon").src = "img/day.svg";
      break;
    default:
      weatherIcon = document.querySelector("#icon").src = "img/cloudy.svg";
  }
  getForecast(response.data.coord);
}
let currentLocation = document.querySelector(".fa-location-crosshairs");
currentLocation.addEventListener("click", function () {
  function retrievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "366c10bcb6394de49050d3d5f0ee5608";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
});

function showFartnheitWeather(event) {
  event.preventDefault();
  let farenheitTemperaturmin = (celsiusTemperaturemin * 9) / 5 + 32;
  let farenheitTemperaturmax = (celsiusTemperaturemax * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fartnheitLink.classList.add("active");
  let minTemperature = document.querySelector(".degreesmin-temperature");
  let maxTemperature = document.querySelector(".degreesmax-temperature");
  minTemperature.innerHTML = Math.round(farenheitTemperaturmin);
  maxTemperature.innerHTML = Math.round(farenheitTemperaturmax);
}
function showCelciyWeather(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fartnheitLink.classList.remove("active");
  let minTemperature = document.querySelector(".degreesmin-temperature");
  let maxTemperature = document.querySelector(".degreesmax-temperature");
  minTemperature.innerHTML = Math.round(celsiusTemperaturemin);
  maxTemperature.innerHTML = Math.round(celsiusTemperaturemax);
}
let celsiusTemperaturemin = null;
let celsiusTemperaturemax = null;
let fartnheitLink = document.querySelector(".farin");
fartnheitLink.addEventListener("click", showFartnheitWeather);

let celsiusLink = document.querySelector(".celsy");
celsiusLink.addEventListener("click", showCelciyWeather);
