window.addEventListener("load", () => {
  // set default location to lynnwood
  let lat = -25.7643;
  let long = 28.2673;
  let typingTimer;
  let doneTypingInterval = 3500; //time in ms (5 seconds)
  const apiKey = "852564f7ef87252587bbbb9057379b0d";
  let apiPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  let apiCity;

  const elTemp = document.querySelector(".js-temperature");
  const elTempMax = document.querySelector(".js-temperature-max");
  const elTempMin = document.querySelector(".js-temperature-min");
  const elDesc = document.querySelector(".js-description");
  const elLoc = document.querySelector(".js-location");
  const elUnit = document.querySelector(".js-temperature-unit");
  const elClick = document.querySelector(".js-temperature-toggle");
  const toggle = document.querySelector(".js-search");
  const elSearch = document.querySelector(".search");
  // details
  const elRealFeel = document.querySelector(".js-realfeel");
  const elWind = document.querySelector(".js-wind");
  const elHumidity = document.querySelector(".js-humidity");
  const elSunrise = document.querySelector(".js-sunrise");
  const elSunset = document.querySelector(".js-sunset");
  const elPressure = document.querySelector(".js-pressure");

  initialize();

  function initialize() {
    setTime();
    fetchAPI(apiPosition);
    toggleUnits();
    checkGeolocation();
  }

  function toggleUnits() {
    //  Change temperature to Celcius/Fehrenheit
    elClick.addEventListener("click", () => {
      changeUnit();
    });
  }

  function checkGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //   retrieve user location
        getLocation(position);
        apiPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
        fetchAPI(apiPosition);
      });
    }
  }

  function changeUnit() {
    if (elUnit.textContent === "°C") {
      elUnit.textContent = "°F";
      elTemp.textContent = Math.round(fehreinheit(elTemp.innerHTML));
      elTempMax.textContent = Math.round(fehreinheit(elTempMax.innerHTML));
      elTempMin.textContent = Math.round(fehreinheit(elTempMin.innerHTML));
      elRealFeel.textContent = Math.round(fehreinheit(elRealFeel.innerHTML));
    } else {
      elUnit.textContent = "°C";
      elTemp.textContent = Math.round(celcius(elTemp.innerHTML));
      elTempMax.textContent = Math.round(celcius(elTempMax.innerHTML));
      elTempMin.textContent = Math.round(celcius(elTempMin.innerHTML));
      elRealFeel.textContent = Math.round(celcius(elRealFeel.innerHTML));
    }
  }

  function setElements(data) {
    const {
      temp_min,
      temp_max,
      temp,
      feels_like,
      humidity,
      pressure,
    } = data.main;
    const { name } = data;
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;
    const { description, icon } = data.weather[0];

    //   SET DOM Elements from API
    elLoc.textContent = name;
    elDesc.textContent = description;
    elTemp.textContent = Math.floor(temp);
    elTempMax.textContent = Math.floor(temp_max);
    elTempMin.textContent = Math.floor(temp_min);

    // details
    elRealFeel.textContent = Math.floor(feels_like);
    elWind.textContent = speed;
    elHumidity.textContent = humidity + " %";
    elSunrise.textContent = convertTime(sunrise);
    elSunset.textContent = convertTime(sunset);
    elPressure.textContent = pressure + " pa";
    return icon;
  }

  function convertTime(time) {
    let timeToFormat = new Date(time * 1000);
    let hours = checkTime(timeToFormat.getHours());
    let minutes = checkTime(timeToFormat.getMinutes());
    return `${hours}:${minutes}`;
  }

  function fetchAPI(api) {
    // open weather api free plan
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != undefined) {
          console.log(data);
          icon = setElements(data);
          setIcons(icon, document.querySelector(".js-icon"));
        }
      });
  }

  function getLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
  }

  function setIcons(icon, iconID) {
    // links icons from open weather api to skycons
    const skycons = new Skycons({ color: "white" });
    let currentIcon;

    switch (icon) {
      // clear
      case "01d":
        currentIcon = "CLEAR_DAY";
        break;
      case "01n":
        currentIcon = "CLEAR_NIGHT";
        break;

      // few clouds
      case "02d":
        currentIcon = "PARTLY_CLOUDY_DAY";
        break;
      case "02n":
        currentIcon = "PARTLY_CLOUDY_NIGHT";
        break;

      // scattered clouds
      case "03d":
        currentIcon = "CLOUDY";
        break;
      case "03n":
        currentIcon = "CLOUDY";
        break;

      // broken clouds
      case "04d":
        currentIcon = "CLOUDY";
        break;
      case "04n":
        currentIcon = "CLOUDY";
        break;

      // shower rain
      case "09d":
        currentIcon = "RAIN";
        break;
      case "09n":
        currentIcon = "RAIN";
        break;

      // rain
      case "10d":
        currentIcon = "RAIN";
        break;
      case "10n":
        currentIcon = "RAIN";
        break;

      // thunderstorm
      case "11d":
        currentIcon = "RAIN";
        break;
      case "11n":
        currentIcon = "RAIN";
        break;

      // snow
      case "13d":
        currentIcon = "SNOW";
        break;
      case "13n":
        currentIcon = "SNOW";
        break;

      // mist/fog
      case "50d":
        currentIcon = "FOG";
        break;
      case "50n":
        currentIcon = "FOG";
        break;
    }
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
    // return skycons.set(iconID, Skycons.FOG);
  }

  function fehreinheit(temp) {
    return temp * (9 / 5) + 32;
  }

  function celcius(temp) {
    return ((temp - 32) * 5) / 9;
  }

  function checkTime(i) {
    // ensure single digit times are accompanied by a zero
    return i < 10 ? "0" + i : i;
  }

  function setTime() {
    // live time update
    let elTime = document.querySelector(".js-time");
    let today = new Date();
    let h = checkTime(today.getHours());
    let m = checkTime(today.getMinutes());
    // let s = checkTime(today.getSeconds());
    // elTime.textContent = `${h}:${m}:${s}`;
    elTime.textContent = `${h}:${m}`;
    setTimeout(function () {
      setTime();
    }, 500);
  }

  toggle.addEventListener("click", () => {
    // search button animation
    const search = document.querySelector(".search");
    toggle.classList.toggle("ripple");
    search.classList.toggle("grow");
    if (search.classList.contains("grow")) {
      search.focus();
    } else {
      search.blur();
    }
  });

  elSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      findCity();
    }
    clearTimeout(typingTimer);
    if (elSearch.value) {
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
  });

  function findCity() {
    let query = elSearch.value;
    apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    fetchAPI(apiCity);
    elSearch.value = "";
  }

  //user is "finished typing," do something
  function doneTyping() {
    findCity();
  }
});
