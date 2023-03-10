let weather = {
	apiKey : "e4f9793434167593573d43dd420f2b41",
	fetchWeather : function(city) {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q="
			+ city
			+ "&units=metric&appid="
			+ this.apiKey
		)
		.then((response) => response.json())
		.then((data) => this.displayWeather(data));
	},
	displayWeather: function(data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		document.querySelector(".city").innerText = name;
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = temp + "°C";
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.querySelector(".wind").innerText = "Wind speed " + speed + " km/h";
		document.querySelector(".weather-result").classList.remove("loading");
	},
	search: function() {
		this.fetchWeather(document.querySelector(".search").value);
	}
};

document.querySelector(".search-btn").addEventListener("click", function() {
	weather.search();
});

document.querySelector(".search").addEventListener("keyup", function(event) {
	if (event.key == "Enter") {
		weather.search();
	}
});

weather.fetchWeather("America");
