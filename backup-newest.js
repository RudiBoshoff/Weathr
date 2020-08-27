window.addEventListener("load", () => {
  // set default location to lynnwood
  let lat = -25.7643;
  let long = 28.2673;
  const elTemp = document.querySelector(".js-temperature");
  const elTempMax = document.querySelector(".js-temperature-max");
  const elTempMin = document.querySelector(".js-temperature-min");
  const elDesc = document.querySelector(".js-description");
  const elLoc = document.querySelector(".js-location");
  const elUnit = document.querySelector(".js-temperature-unit");
  const elClick = document.querySelector(".js-temperature-toggle");
  const toggle = document.querySelector(".js-search");

  initialize();

  // check if user enabled geolocation

  //  Change temperature to Celcius/Fehrenheit
  elClick.addEventListener("click", () => {
    changeUnit();
  });

  function checkGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //   retrieve user location
        getLocation(position);
        //   fetch weather api
        fetchAPI();
      });
    }
  }

  function changeUnit() {
    if (elUnit.textContent === "°C") {
      elUnit.textContent = "°F";
      elTemp.textContent = Math.round(fehreinheit(elTemp.innerHTML));
      elTempMax.textContent = Math.round(fehreinheit(elTempMax.innerHTML));
      elTempMin.textContent = Math.round(fehreinheit(elTempMin.innerHTML));
    } else {
      elUnit.textContent = "°C";
      elTemp.textContent = Math.round(celcius(elTemp.innerHTML));
      elTempMax.textContent = Math.round(celcius(elTempMax.innerHTML));
      elTempMin.textContent = Math.round(celcius(elTempMin.innerHTML));
    }
  }

  function setElements(data) {
    const { temp_min, temp_max, temp } = data.main;
    const { name } = data;
    const { description, icon } = data.weather[0];

    //   SET DOM Elements from API
    elLoc.textContent = name;
    elDesc.textContent = description;
    elTemp.textContent = Math.floor(temp);
    elTempMax.textContent = Math.floor(temp_max);
    elTempMin.textContent = Math.floor(temp_min);
    return icon;
  }

  function fetchAPI() {
    // open weather api free plan
    const apiKey = "852564f7ef87252587bbbb9057379b0d";
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        icon = setElements(data);
        setIcons(icon, document.querySelector(".js-icon"));
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

  function initialize() {
    setTime();
    fetchAPI();
    checkGeolocation();
  }

  // ensure single digit times are accompanied by a zero
  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  // live time update
  function setTime() {
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

  // search button animation
  toggle.addEventListener("click", () => {
    const search = document.querySelector(".search");
    toggle.classList.toggle("ripple");
    search.classList.toggle("grow");
  });
});
