const weatherLayout = document.getElementById("weather-layout");
const infoLayout = document.getElementById("info-layout");
const searchLayout = document.getElementById("search-layout");
const searchBox = document.querySelector(".search-box");
const inputBar = document.querySelector(".input-bar");
const searchBtn = document.querySelector(".search-btn");
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let counter = 0;

const changeID = (element, newID) => element.id = newID;


searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const city = inputBar.value;

    //remove background video
    if (document.querySelector('video') !== null) {
        document.querySelector('video').remove();

        //make bottom bar visible & move search box to bottom
        changeID(document.getElementById('home-search-layout'), 'search-layout');
        changeID(document.getElementById('home-search-box'), 'result-search-box');
    }

    //fetch weather data
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=c1c493a1ed79402aa6090757230402&q=${city}&days=7&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            weatherLayout.innerHTML = "";
            data.forecast.forecastday.forEach((day, index) => {
                const weatherCard = document.createElement("div");
                let date = data.forecast.forecastday[index].date;
                weatherCard.classList.add("weather-card");
                console.log(data);

                if (index === 0) {
                    weatherCard.classList.add('first-card');
                    date = "Today";
                } else if (index === 6) {
                    weatherCard.classList.add('last-card');
                }

                const d = new Date(data.forecast.forecastday[index].date);
                console.log(d.getDay());

                weatherCard.innerHTML = `
            <h2>${weekDays[d.getDay()]}</h2>
            <p><strong>${date}</strong></p>
            <div>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
            <p class='weather-description'><strong>${day.day.condition.text}</strong></p>
            </div>
            <p class='temp'>${day.day.avgtemp_c}°</p>
            
          `


                const cityName = document.querySelector(".city-name");
                cityName.innerHTML = `
                <h1>${data.location.name}</h1>
                `
                console.log(weatherCard);;

                weatherLayout.appendChild(weatherCard);

                if (counter < 6) {
                    weatherLayout.appendChild(document.createElement("hr"));
                    console.log(`day is ${day}`);
                    counter++;
                } else { counter = 0 }

            });
            inputBar.value = "";
        });


    //fetch img data
    fetch(`https://api.unsplash.com/search/photos/?client_id=2kd3ZjVt5tGBAlH0KMTER7YQwBnVlRIImLRYgoD3yPM&query=${city}`)
        .then((response) => response.json())
        .then((data) => {
            let randomIndex = Math.floor(Math.random() * data.results.length);
            console.log(data.results);
            console.log(data.results[randomIndex].urls.regular);
            document.getElementById('weather-layout').style.backgroundImage = `url(${data.results[randomIndex].urls.regular})`;
        });
});