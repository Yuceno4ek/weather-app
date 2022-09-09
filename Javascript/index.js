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
  let town = document.querySelector(".location");
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
  // let town = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let locationItem = document.querySelector(".location");
  let currentDegrees = document.querySelector(".degrees");
  currentDegrees.innerHTML = `${temperature}°C`;

  locationItem.innerHTML = response.data.name;
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
