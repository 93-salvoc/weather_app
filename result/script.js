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

    //remove background video
    document.querySelector('video').remove();

    //fetch weather data
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


    //fetch img data
    fetch(
        `https://api.unsplash.com/search/photos/?client_id=2kd3ZjVt5tGBAlH0KMTER7YQwBnVlRIImLRYgoD3yPM&query=${city}`
      )
        .then((response) => response.json())
        .then((data) => {
          let randomIndex = Math.floor(Math.random() * data.results.length);
          console.log(data.results);
          console.log(data.results[randomIndex].urls.regular);
        //   document.body.style.backgroundImage = `url(${data.results[randomIndex].urls.regular})`;
          document.getElementById('weather-layout').style.backgroundImage = `url(${data.results[randomIndex].urls.regular})`;
        });
});