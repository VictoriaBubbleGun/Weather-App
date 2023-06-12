function clock() {
  let now = new Date();
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
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let currentday = days[now.getDay()];
  let currentdate = now.getDate();
  let currentmonth = months[now.getMonth()];
  let currentyear = now.getFullYear();
  let date = document.querySelector("#date");
  time.innerHTML = `${hour}:${minutes}`;
  date.innerHTML = `${currentday}, ${currentdate}. ${currentmonth}.${currentyear}`;
}
let time = document.querySelector("#timing");
time.addEventListener("load", clock());

let newTemperture = document.querySelector("#localTemperture");
function celsiusTemperature() {
  newTemperture.innerHTML = "30°";
}
let degree = document.querySelector("#degree");
degree.addEventListener("click", celsiusTemperature);

function changeDegreetoFahrenheit() {
  let fahrenheittemp = Math.round(30 * 1.8 + 32);
  newTemperture.innerHTML = `${fahrenheittemp}°`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeDegreetoFahrenheit);

function showtemp(reponse) {
  console.log(reponse);
  let temp = reponse.data.main.temp;
  let currentCity = document.querySelector("#localCity");
  let roundedtemp = Math.round(temp);
  newTemperture.innerHTML = `${roundedtemp}°`;
  let currentLocalCity = reponse.data.name;
  currentCity.innerHTML = `${currentLocalCity}`;
}

function showPosition(position) {
  let apiKey = "384ce7707e4353e52db5c59af61a3812";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showtemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#newCity");
  let cityname = city.value;
  console.log(cityname);
  let apiKey = "384ce7707e4353e52db5c59af61a3812";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showtemp);
}

let citySearch = document.querySelector("#citysearch");
citySearch.addEventListener("submit", city);
