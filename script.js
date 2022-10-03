

let weather ={
    APIKey: "3b4cdfb6f9926b7351015a9a33b87682",
    fetchWeather: function(city){
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" + city 
            + "&units=metric&appid="+ this.APIKey
            
        )
        .then((response)=> response.json())
        .then((data)=> this.displayWeather(data));
    },
    displayWeather: function(data) {
        const  {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const { speed} =data.wind;
        console.log(name, icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText= "Weather in" +name;
        document.querySelector(".icon").src= "http://api.openweathermap.org/img/wn" +icon + ".ping";
        document.querySelector(".description").innerText =description;
        document.querySelector(".temp").innerText=temp+"°C";
        document.querySelector(".humidity").innerText = "Humidity" +humidity + "%";
        document.querySelector(".wind").innerText= "Wind Speed" + speed + "km/h";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};
document.querySelector(".search button").addEventListener("click", function(){
weather.search();
});


