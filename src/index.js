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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${hour}:${minutes}`;
  let currentday = days[now.getDay()];
  let currentdate = now.getDate();
  let currentmonth = months[now.getMonth()];
  let currentyear = now.getFullYear();
  let date = document.querySelector("#date");
  date.innerHTML = `${currentday}, ${currentdate}. ${currentmonth} ${currentyear}`;
}
let time = document.querySelector("#timing");
time.addEventListener("load", clock());

function showReponse(reponse) {
  console.log(reponse);
  let newTemperture = document.querySelector("#localTemperture");
  let temp = reponse.data.temperature.current;
  let currentCity = document.querySelector("#localCity");
  let roundedtemp = Math.round(temp);
  newTemperture.innerHTML = `${roundedtemp}°`;
  let currentLocalCity = reponse.data.city;
  currentCity.innerHTML = `${currentLocalCity}`;
  let newWind = document.querySelector("#wind");
  let wind = reponse.data.wind.speed;
  let roundedWind = Math.round(wind);
  newWind.innerHTML = `${roundedWind}km`;
  let newHumidity = document.querySelector("#humidity");
  let humidity = reponse.data.temperature.humidity;
  newHumidity.innerHTML = `${humidity}%`;
  let currentWeatherIcon = document.querySelector("#currentWeatherIcon");
  let newcurrentWeatherIcon = reponse.data.condition.icon;
  currentWeatherIcon.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${newcurrentWeatherIcon}.png`
  );
}

function showPosition(position) {
  let apiKey = "c6415ot471311fe21b9018d4f7a3003e";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(url).then(showReponse);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

window.onload = getCurrentPosition;

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#newCity");
  let cityname = city.value;
  console.log(cityname);
  let apiKey = "c6415ot471311fe21b9018d4f7a3003e";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityname}&key=${apiKey}&units=metric`;
  axios.get(url).then(showReponse);
}

let citySearch = document.querySelector("#citysearch");
citySearch.addEventListener("submit", city);
