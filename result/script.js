const weatherLayout = document.getElementById("weather-layout");
const infoLayout = document.getElementById("info-layout");
const searchLayout = document.getElementById("search-layout");
const searchBox = document.querySelector(".search-box");
const inputBar = document.querySelector(".input-bar");
const searchBtn = document.querySelector(".search-btn");
let counter=0;

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const city = inputBar.value;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=c1c493a1ed79402aa6090757230402&q=${city}&days=7&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            weatherLayout.innerHTML = "";
            data.forecast.forecastday.forEach(day => {
                const weatherCard = document.createElement("div");
                weatherCard.classList.add("weather-card");

                weatherCard.innerHTML = `
            <h2>${data.location.name}</h2>
            <div>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
            <p class='weather-description'>${day.day.condition.text}</p>
            </div>
            <p class='temp'>${day.day.avgtemp_c}°</p>
            
          `
                console.log(weatherCard);;

                weatherLayout.appendChild(weatherCard);

                if (counter < 6) {
                    weatherLayout.appendChild(document.createElement("hr"));
                    console.log(`day is ${day}`);
                    counter++;
                }
                else {counter = 0}

            });
            inputBar.value = "";
        });
});