

var APIKey = "3b4cdfb6f9926b7351015a9a33b87682";
var fiveDayContainerEl = document.querySelector(".container-5day");

let weather = {
  fetchWeather: function (city) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        APIKey
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
        this.display5dayWeather(data.coord.lat, data.coord.lon);

        console.log(data);
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in" + name;
    document.querySelector(".icon").src =
      "http://api.openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity" + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed" + speed + "km/h";
  },
  display5dayWeather: function (lat, lon) {
    const fivedayUrL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    fetch(fivedayUrL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        for (i = 8; i < data.list.length; i += 7) {
          var dateEl = document.createElement("p");
          var iconEl = document.createElement("img");
          var tempEl = document.createElement("p");
          var windEl = document.createElement("p");
          var humidityEL = document.createElement("p");
          var card = document.createElement("div");
          card.classList.add("card")
          dateEl.classList.add("date")
          iconEl.classList.add("icon")
          tempEl.classList.add("temp")
          windEl.classList.add("wind")
          humidityEL.classList.add("humidity")



          dateEl.innerText = data.list[i].dt;
          iconEl.src =
            "http://api.openweathermap.org/img/w/" +
            data.list[i].weather[0].icon +
            ".png";
          tempEl.innerText = data.list[i].main.temp;
          windEl.innerText = data.list[i].wind.speed;
          humidityEL.innerText = data.list[i].main.humidity;
          //     appending all the created elements to a container
          card.append(dateEl, iconEl, tempEl, windEl, humidityEL);
          //    appending all the cards to the parent container
          fiveDayContainerEl.append(card);
        }
      });
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});


