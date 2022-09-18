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

function showWeather(response) {
  console.log(response.data);
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
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
