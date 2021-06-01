let now = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri"];
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

let day = days[now.getDay()];
let month = months[now.getMonth()];
let currentDate = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}

let current = document.querySelector("#current-date");
current.innerHTML = `${day}, ${currentDate} ${month} ${hour}:${minutes}`;

function cityWeather(response) {
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#current-celcius").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function newCity(event) {
  event.preventDefault();
  let apiKey = "90cc04858e590b27514e091504dac169";
  let searchCity = document.querySelector("#search-result");
  let result = searchCity.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityWeather);

  let newResult = document.querySelector("#search-city");
  newResult.innerHTML = `${result}`;
}

let form = document.querySelector("#search");
form.addEventListener("submit", newCity);

function locationName(response) {
  let apiKey = "90cc04858e590b27514e091504dac169";
  let city = response.data.name;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityWeather);
}

function searchLocation(position) {
  let apiKey = "90cc04858e590b27514e091504dac169";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(locationName);
}

function locationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", locationWeather);

function changeDegree() {
  let imageCelcius = document.querySelector("#degree-celcius");
  let loveChange = document.querySelector("#love");
  console.log(loveChange.innerHTML.trim());
  if (loveChange.innerHTML.trim() === "Love Fahrenheit?") {
    imageCelcius.src = "images/degreef.png";
    let celcius = document.querySelector("#current-celcius");
    let fahrenheit = celcius.innerHTML;
    celcius.innerHTML = Math.round((fahrenheit * 9) / 5 + 32);
    loveChange.innerHTML = "Love Celcius?";
  } else {
    imageCelcius.src = "images/degreec.png";
    let fahrenheit = document.querySelector("#current-celcius");
    let celcius = fahrenheit.innerHTML;
    fahrenheit.innerHTML = Math.round(((celcius - 32) * 5) / 9);
    let loveChange = document.querySelector("#love");
    loveChange.innerHTML = "Love Fahrenheit?";
  }
}

let change = document.querySelector("#degree-change");
change.addEventListener("click", changeDegree);
