const apikey = "8540907f0c6297067d19d631480f66b2";

      // function to fetch weather data based on latitude and longitude
      function getWeatherDataByCoords(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
          .then(response => response.json())
          .then(data => {
            // update the temperature, city name and feels-like element on the web page
            document.getElementById("temp").textContent = data.main.temp+"&deg;c";
            document.getElementById("city").textContent = data.name;
            document.getElementById("feels-like").textContent = data.weather[0].main;

            document.getElementById("wind-speed").textContent = data.wind.speed;
            document.getElementById("humidity").textContent = data.main.humidity;
            if (data.rain) {
              document.getElementById("rain-chance").textContent = data.rain["1h"];
            } else {
              document.getElementById("rain-chance").textContent = "0";
            }
          })
          .catch(error => console.error(error));
      }

      // function to fetch weather data based on city name
      function getWeatherDataByCityName(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
          .then(response => response.json())
          .then(data => {
            // update the temperature, city name and feels-like element on the web page
            document.getElementById("temp").textContent = data.main.temp;
            document.getElementById("city").textContent = data.name;
            document.getElementById("feels-like").textContent = data.weather[0].main;
            // update additional weather data
            document.getElementById("wind-speed").textContent = data.wind.speed;
            document.getElementById("humidity").textContent = data.main.humidity;
            if (data.rain) {
              document.getElementById("rain-chance").textContent = data.rain["1h"];
            } else {
              document.getElementById("rain-chance").textContent = "0";
            }
          })
          .catch(error => console.error(error));
      }

      // get the user's location if they allow it
      function getLocation() {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherDataByCoords(lat, lon);
        }, error => {
          console.error(error);
          alert("Unable to retrieve your location. Please allow location access or enter a city manually.");
        });
      }

      // handle search form submission
      const searchForm = document.getElementById("search-form");
      searchForm.addEventListener("submit", event => {
        event.preventDefault();
        const city = document.getElementById("search-input").value;
        getWeatherDataByCityName(city);
       document.getElementById("search-input").value = " ";
      });

      // initialize the weather data based on the user's location
      getLocation();
