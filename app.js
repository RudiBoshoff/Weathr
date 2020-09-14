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
          console.log(api);
          weather.setValues(this.data);
          weather.setIcon();
          displayValues();
        }
      });
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
  location.textContent = weather.name;
  description.textContent = weather.description;
  temperature.textContent = weather.temperature;
  realFeel.textContent = `${weather.real_feel} °`;
  humidity.textContent = `${weather.humidity} %`;
  max.textContent = weather.max;
  min.textContent = weather.min;
  sunrise.textContent = weather.sunrise;
  sunset.textContent = weather.sunset;
  pressure.textContent = `${weather.pressure} hPa`;
}

function toggleUnits() {
  if (weather.units == "metric") {
    weather.units = "imperial";
  } else {
    weather.units = "metric";
  }
}

function setUserPosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    weather.lat = position.coords.latitude;
    weather.long = position.coords.longitude;
    api.setApiAddress();
    api.fetchApi();
    displayValues();
  });
}

function checkGeolocation() {
  if (navigator.geolocation) {
    setUserPosition();
  }
}

function initialize() {
  time.setTime();
  checkGeolocation();
  api.setApiAddress();
  api.fetchApi();
  displayValues();
  setInterval(() => {
    api.setApiAddress();
    api.fetchApi();
    displayValues();
  }, 600000);
}

const time = new Time();
const weather = new Weather();
const api = new API();

window.addEventListener("DOMContentLoaded", () => {
  initialize();

  const unitToggle = document.querySelector(".js-temperature-toggle");
  const searchToggle = document.querySelector(".js-search");
  const search = document.querySelector(".search");

  unitToggle.addEventListener("click", () => {
    toggleUnits();
    api.setApiAddress();
    api.fetchApi();
    displayValues();
  });

  searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("ripple");
    search.classList.toggle("grow");
    if (search.classList.contains("grow")) {
      search.focus();
    } else {
      if (search.value != "") {
        weather.query = search.value;
        api.setApiAddress();
        api.fetchApi();
        displayValues();
        search.value = "";
      }
      search.blur();
    }
  });

  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      weather.query = search.value;
      api.setApiAddress();
      api.fetchApi();
      displayValues();
      search.value = "";
    }
  });
});
