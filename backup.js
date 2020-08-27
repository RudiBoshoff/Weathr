window.addEventListener("load", () => {
  let lat;
  let long;
  const elTemp = document.querySelector(".js-temp");
  const elTempMax = document.querySelector(".js-temp-max");
  const elTempMin = document.querySelector(".js-temp-min");
  const elDesc = document.querySelector(".js-desc");
  const elLoc = document.querySelector(".js-loc");

  // check if user enabled geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      //   lat = -25.7828;
      //   long = 28.2933;

      // open weather api free plan
      const apiKey = "852564f7ef87252587bbbb9057379b0d";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp_min, temp_max, temp } = data.main;
          const { name } = data;
          const { description, icon, main } = data.weather[0];

          //   SET DOM Elements from API
          elLoc.textContent = name;
          elDesc.textContent = description;
          elTemp.textContent = Math.floor(temp);
          elTempMax.textContent = Math.floor(temp_max);
          elTempMin.textContent = Math.floor(temp_min);
          console.log(icon);

          //   SET ICON
          setIcons(icon, document.querySelector(".js-icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    let currentIcon;
    switch (icon) {
      // clear
      case "01d":
        currentIcon = "CLEAR_DAY";
        console.log(currentIcon);
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
    // return skycons.set(iconID, Skycons[currentIcon]);
    return skycons.set(iconID, Skycons.FOG);
  }
});
