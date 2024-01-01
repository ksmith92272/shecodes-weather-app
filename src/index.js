function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let day = date.getDay();

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	if (hours < 10) {
		hours = `0${hours}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let formattedDay = days[day];
	return `${formattedDay} ${hours}:${minutes}`;
}

function search(event) {
	event.preventDefault();

	let searchInputElement = document.querySelector("#search-input");
	let cityElement = document.querySelector("#current-city");
	cityElement.innerHTML = searchInputElement.value;

	getWeather(searchInputElement.value);
}

function getWeather(city) {
	let apiKey = `6atoab0f92eca3d102a54e7250f4dd0f`;
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

	axios.get(apiUrl).then(displayCurrentTemp);
}

function displayCurrentTemp(response) {
	let temp = Math.round(response.data.temperature.current);
	let unit = document.getElementById(`current-temperature-unit`);

	if (unit.classList.contains("fahrenheit")) {
		temp = Math.round((temp * 9) / 5 + 32);
	}

	let currentTemp = document.getElementById(`current-temperature-value`);

	currentTemp.innerHTML = temp;
}

function convertToFahrenheit(temp) {
	return (temp * 9) / 5 + 32;
}

function changeToFahrenheit() {
	let unit = document.getElementById("current-temperature-unit");
	unit.classList.remove("celcius");
	unit.classList.add("fahrenheit");

	let celcius = document.getElementById("celcius");
	celcius.classList.remove("selected");
	celcius.classList.add("deselected");

	let fahrenheit = document.getElementById("fahrenheit");
	fahrenheit.classList.remove("deselected");
	fahrenheit.classList.add("selected");

	let tempElement = document.getElementById(`current-temperature-value`);
	let tempValue = parseFloat(tempElement.textContent);
	let convertedTemp = Math.round((tempValue * 9) / 5 + 32);
	tempElement.innerHTML = convertedTemp;
}

function changeToCelcius() {
	let unit = document.getElementById("current-temperature-unit");
	unit.classList.remove("fahrenheit");
	unit.classList.add("celcius");

	let celcius = document.getElementById("celcius");
	celcius.classList.remove("deselected");
	celcius.classList.add("selected");

	let fahrenheit = document.getElementById("fahrenheit");
	fahrenheit.classList.remove("selected");
	fahrenheit.classList.add("deselected");

	let tempElement = document.getElementById(`current-temperature-value`);
	let tempValue = parseFloat(tempElement.textContent);
	let convertedTemp = Math.round(((tempValue - 32) * 5) / 9);
	tempElement.innerHTML = convertedTemp;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celcius = document.getElementById("celcius");
celcius.addEventListener("click", changeToCelcius);

let fahrenheit = document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);
