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

let temp = null;

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let apiKey = "c6415ot471311fe21b9018d4f7a3003e";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(url).then(showReponse);
}
function showReponse(reponse) {
  let newTemperture = document.querySelector("#localTemperture");
  temp = reponse.data.temperature.current;
  let roundedtemp = Math.round(temp);
  newTemperture.innerHTML = `${roundedtemp}°`;
  let currentCity = document.querySelector("#localCity");
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
  getForecast(reponse.data.coordinates);
}

function getForecast(reponse) {
  let apiKey = "c6415ot471311fe21b9018d4f7a3003e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${reponse.longitude}&lat=${reponse.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(reponse) {
  let forecast = reponse.data.daily;
  let forecastElement = document.querySelector("#forcast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <span class="forcastDays">
          ${formatDay(forecastDay.time)} <br />
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"/> <br />
         <span class= "temp-max"> ${Math.round(
           forecastDay.temperature.maximum
         )}° </span> <span class= "temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}° </span>
        </span>
      `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

window.onload = getCurrentPosition;

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#newCity");
  let cityname = city.value;
  let apiKey = "c6415ot471311fe21b9018d4f7a3003e";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityname}&key=${apiKey}&units=metric`;
  axios.get(url).then(showReponse);
}

let citySearch = document.querySelector("#citysearch");
citySearch.addEventListener("submit", city);

let newTemperture = document.querySelector("#localTemperture");
function celsiusTemperature(event) {
  event.preventDefault();
  newTemperture.innerHTML = `${Math.round(temp)}°`;
  fahrenheit.classList.remove("active");
  degree.classList.add("active");
}
let degree = document.querySelector("#metric");
degree.addEventListener("click", celsiusTemperature);

function changeDegreetoFahrenheit(event) {
  event.preventDefault();
  let fahrenheittemp = Math.round(temp * 1.8 + 32);
  newTemperture.innerHTML = `${fahrenheittemp}°`;
  fahrenheit.classList.add("active");
  degree.classList.remove("active");
}
let fahrenheit = document.querySelector("#imperial");
fahrenheit.addEventListener("click", changeDegreetoFahrenheit);
