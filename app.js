class Time {
  getTime() {
    const today = new Date();
    const [hours, minutes, seconds] = [
      this.formatTime(today.getHours()),
      this.formatTime(today.getMinutes()),
    ];
    return `${hours}:${minutes}`;
  }
  setTime() {
    const time = document.querySelector(".js-time");
    setInterval(() => {
      time.textContent = this.getTime();
    }, 1000);
  }
  formatTime(t) {
    return t < 10 ? `0${t}` : t;
  }
  convertUnixTime(t) {
    return new Date(t * 1e3).toISOString().slice(-13, -8);
  }
}

class Weather {
  constructor() {
    this.lat = 51.5074;
    this.long = -0.1278;
    this.units = "metric";
  }

  setValues(data) {
    this.temperature = Math.floor(data.main.temp);
    this.min = Math.floor(data.main.temp_min);
    this.max = Math.floor(data.main.temp_max);
    this.pressure = data.main.pressure;
    this.humidity = data.main.humidity;
    this.real_feel = Math.floor(data.main.feels_like);
    this.name = data.name;
    this.wind_speed = data.wind.speed;
    this.sunrise = time.convertUnixTime(data.sys.sunrise + data.timezone);
    this.sunset = time.convertUnixTime(data.sys.sunset + data.timezone);
    this.description = data.weather[0].description;
    this.icon_ID = data.weather[0].icon;
    this.timezone = data.timezone;
    this.country = data.sys.country;
  }

  setIcon() {
    const skycons = new Skycons({ color: "white" });
    this.getIcon();
    skycons.play();
    skycons.set(document.querySelector(".js-icon"), Skycons[weather.icon]);
    // return skycons.set(iconID, Skycons.FOG);
  }

  getIcon() {
    switch (this.icon_ID) {
      // clear
      case "01d":
        this.icon = "CLEAR_DAY";
        break;
      case "01n":
        this.icon = "CLEAR_NIGHT";
        break;

      // few clouds
      case "02d":
        this.icon = "PARTLY_CLOUDY_DAY";
        break;
      case "02n":
        this.icon = "PARTLY_CLOUDY_NIGHT";
        break;

      // scattered clouds
      case "03d":
        this.icon = "CLOUDY";
        break;
      case "03n":
        this.icon = "CLOUDY";
        break;

      // broken clouds
      case "04d":
        this.icon = "CLOUDY";
        break;
      case "04n":
        this.icon = "CLOUDY";
        break;

      // shower rain
      case "09d":
        this.icon = "RAIN";
        break;
      case "09n":
        this.icon = "RAIN";
        break;

      // rain
      case "10d":
        this.icon = "RAIN";
        break;
      case "10n":
        this.icon = "RAIN";
        break;

      // thunderstorm
      case "11d":
        this.icon = "RAIN";
        break;
      case "11n":
        this.icon = "RAIN";
        break;

      // snow
      case "13d":
        this.icon = "SNOW";
        break;
      case "13n":
        this.icon = "SNOW";
        break;

      // mist/fog
      case "50d":
        this.icon = "FOG";
        break;
      case "50n":
        this.icon = "FOG";
        break;
    }
  }
}

class API {
  constructor() {
    this.key = "852564f7ef87252587bbbb9057379b0d";
    this.address;
    this.data;
  }

  setApiAddress() {
    if (weather.query) {
      this.address = `https://api.openweathermap.org/data/2.5/weather?q=${weather.query}&appid=${this.key}&units=${weather.units}`;
    } else if (weather.lat && weather.long) {
      this.address = `https://api.openweathermap.org/data/2.5/weather?lat=${weather.lat}&lon=${weather.long}&appid=${this.key}&units=${weather.units}`;
    }
  }

  fetchApi() {
    fetch(this.address)
      .then((response) => {
        return response.json();
      })
      .then((serverData) => {
        if (serverData != undefined) {
          this.data = serverData;
          weather.setValues(this.data);
          weather.setIcon();
          displayValues();
        }
      });
  }
}

function animateNumbers(targetVal, targetElement) {
  // animateNumbers Logic
  // check if target value is negative
  //   => true target is negative
  //     check if current value is bigger than the negative target value
  //         => true current value is smaller
  //             increment current value
  //             WHY ? to get current value closer to target value
  //         => false
  //             change the element value to the desired value
  //             WHY ? using rounding will create "small errors" so the desired value is not attainable
  //             WHY use rounding, Otherwise app looks ugly.
  //   => false target is positive
  //     check if current value is smaller than the positive target value
  //         => true current value is smaller
  //             increment current value
  //             WHY? to get current value closer to target value
  //         => false
  //             change the element value to the desired value
  //             WHY? using rounding will create "small errors" so the desired value is not attainable
  //             WHY use rounding, Otherwise app looks ugly.

  //             Thinking about this... because of rounding this approach allows for an increment to move past the target value
  //             Hence the reason for changing the element to the target value at the end. To solve this we need to stop the incrementing process
  //             one step before.

  let currentVal = parseInt(targetElement.innerText, 10);
  let incrememtCount = 8;
  const increment = targetVal / incrememtCount;

  if (targetVal < 0) {
    if (currentVal > targetVal - increment) {
      currentVal = +targetElement.innerText + increment;
      targetElement.innerText = Math.floor(currentVal);
      setTimeout(() => {
        animateNumbers(targetVal, targetElement);
      }, 100);
    } else {
      targetElement.innerText = targetVal;
    }
  } else {
    if (currentVal < targetVal - increment) {
      currentVal = +targetElement.innerText + increment;
      targetElement.innerText = Math.ceil(currentVal);
      setTimeout(() => {
        animateNumbers(targetVal, targetElement);
      }, 100);
    } else {
      targetElement.innerText = targetVal;
    }
  }
}
function displayValues() {
  //main section
  const temperature = document.querySelector(".js-temperature");
  const max = document.querySelector(".js-temperature-max");
  const min = document.querySelector(".js-temperature-min");
  const description = document.querySelector(".js-description");
  const location = document.querySelector(".js-location");
  const unit = document.querySelector(".js-temperature-unit");

  // details section
  const realFeel = document.querySelector(".js-realfeel");
  const windSpeed = document.querySelector(".js-wind");
  const humidity = document.querySelector(".js-humidity");
  const sunrise = document.querySelector(".js-sunrise");
  const sunset = document.querySelector(".js-sunset");
  const pressure = document.querySelector(".js-pressure");

  // set values
  //   with units
  if (weather.units == "metric") {
    unit.textContent = "°C";
    windSpeed.textContent = `${weather.wind_speed} m/s`;
  } else {
    unit.textContent = "°F";
    windSpeed.textContent = `${weather.wind_speed} mph`;
  }

  //   without units

  location.textContent = `${weather.name}, ${weather.country}`;
  description.textContent = weather.description;
  realFeel.textContent = `${weather.real_feel} °`;
  humidity.textContent = `${weather.humidity} %`;
  sunrise.textContent = weather.sunrise;
  sunset.textContent = weather.sunset;
  pressure.textContent = `${weather.pressure} hPa`;

  // animate numbers
  let elements = [temperature, max, min];
  elements.forEach((element) => (element.innerHTML = "0"));
  animateNumbers(weather.temperature, temperature);
  animateNumbers(weather.max, max);
  animateNumbers(weather.min, min);
}

function toggleUnits() {
  if (weather.units == "metric") {
    weather.units = "imperial";
  } else {
    weather.units = "metric";
  }
  localStorage.setItem("units", weather.units);
}

function setUserPosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    weather.lat = position.coords.latitude;
    weather.long = position.coords.longitude;
    api.setApiAddress();
    api.fetchApi();
  });
}

function checkGeolocation() {
  if (navigator.geolocation) {
    setUserPosition();
  }
}

function initialize() {
  time.setTime();
  if (localStorage.getItem("city")) {
    weather.query = localStorage.getItem("city");
    if (localStorage.getItem("units")) {
      weather.units = localStorage.getItem("units");
    }
    api.setApiAddress();
    api.fetchApi();
  } else {
    checkGeolocation();
    api.setApiAddress();
    api.fetchApi();
  }
  setInterval(() => {
    api.setApiAddress();
    api.fetchApi();
  }, 600000);
}

const time = new Time();
const weather = new Weather();
const api = new API();

window.addEventListener("DOMContentLoaded", () => {
  initialize();

  const unitToggle = document.querySelector(".js-temperature-toggle");
  const searchToggle = document.querySelector(".js-search");
  const search = document.querySelector(".js-input");
  const logo = document.querySelector(".js-logo");

  unitToggle.addEventListener("click", () => {
    toggleUnits();
    api.setApiAddress();
    api.fetchApi();
  });

  searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("ripple");
    search.classList.toggle("grow");
    if (search.classList.contains("grow")) {
      search.focus();
    } else {
      if (search.value != "") {
        weather.query = search.value;
        localStorage.setItem("city", weather.query);
        api.setApiAddress();
        api.fetchApi();
        search.value = "";
      }
      search.blur();
    }
  });

  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      weather.query = search.value;
      localStorage.setItem("city", weather.query);
      api.setApiAddress();
      api.fetchApi();
      search.value = "";
    }
  });

  logo.addEventListener("click", () => {
    api.setApiAddress();
    api.fetchApi();
  });
});
