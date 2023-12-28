let searchbox = document.querySelector(".search-input");
let searchButton = document.querySelector(".search-btn");
let emptyMsg = document.querySelector(".empty-msg");
const api = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "f7500eccc788ac3c9604d8dd29b18a61";
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherInfo(para) {
  try {
    const response = await fetch(api + para + "&appid=" + apikey);
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const result = await response.json();
      console.log(result);

      document.querySelector(".city").innerHTML = result.name;
      document.querySelector(".temp").innerHTML =
        Math.round(result.main.temp) + "&degC";
      document.querySelector(".humidity").innerHTML =
        result.main.humidity + "%";
      document.querySelector(".wind").innerHTML = result.wind.speed + " km/hr";
      document.querySelector(".country").innerHTML =
        "country : " + result.sys.country;

      if (result.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/images/clouds.png";
      } else if (result.weather[0].main == "Clear") {
        weatherIcon.src = "assets/images/clear.png";
      } else if (result.weather[0].main == "Rain") {
        weatherIcon.src = "assets/images/rain.png";
      } else if (result.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/images/drizzle.png";
      } else if (result.weather[0].main == "Mist") {
        weatherIcon.src = "assets/images/mist.png";
      } else if (result.weather[0].main == "Fog") {
        weatherIcon.src = "assets/images/mist.png";
      } else {
        weatherIcon.src = "assets/images/clear.png";
      }
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}
searchButton.addEventListener("click", () => {
  if (searchbox.value == "") {
    emptyMsg.style.opacity = 1;
    setTimeout(() => {
      emptyMsg.style.opacity = 0;
    }, 1500);
  } else {
    getWeatherInfo(searchbox.value);
  }
});
window.addEventListener("DOMContentLoaded", () => {
  let text = "delhi";
  searchbox.value = text;
  getWeatherInfo(text);
});
