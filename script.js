const searchForm = document.querySelector(".search-box");
console.log(document.querySelector('.weather-layout')); //accessing html returns null :( (even when the code is in index.html)

const currentDate = new Date();
const currentDay = currentDate.getDay() - 1; //returns current day of the week (0=Monday...)
console.log(currentDay);
let weekday;

searchForm.addEventListener('submit', (getWeatherAndImg) => {
    getWeatherAndImg.preventDefault(); //to prevent this function from running right away when the site is called (this would be default with "submit")
    
    //get input and save in city variable
    const city = document.getElementById("city-home").value;

    //update html - template
    document.body.innerHTML = 
        `<div class=“app-container”>
            <div class=“weather-layout”>
                <div class="weather-day" id="0">
                    <p class="day">Monday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
                <div class="weather-day" id="1">
                    <p class="day">Tuesday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
                <div class="weather-day" id="2">
                    <p class="day">Wednesday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
                <div class="weather-day" id="3">
                    <p class="day">Thursday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
                <div class="weather-day" id="4">
                    <p class="day">Friday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
                <div class="weather-day" id="5">
                    <p class="day">Saturday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
                <div class="weather-day" id="6">
                    <p class="day">Sunday</p>
                    <p class="date">Date</p>
                    <p class="icon">Icon</p>
                    <p class="temperature">Temperature</p>
                </div>
            </div>
            <div class=“city-layout”>
                <form class="search-box">
                    <input id="city-home" type="text" required="required" placeholder="City" />
                    <button type="submit" class="search-btn">Search</button>
                </form>
                <div id=“result”>
                    here goes city that was searched for
                </div>
            </div>
        </div>
        <script src="script.js"></script>`;
    
    //fetch img based on input
    fetch(`https://api.unsplash.com/search/photos/?client_id=2kd3ZjVt5tGBAlH0KMTER7YQwBnVlRIImLRYgoD3yPM&query=${city}`) //Is it ok to use Abed's key here?
        .then((response) => response.json())
        .then((data) => {
          let randomIndex = Math.floor(Math.random() * data.results.length);
          const imgURL = data.results[randomIndex].urls.regular;
          console.log(imgURL);
          //set img as background of #weather-layout
          //document.body.style.backgroundImage = `url(${imgURL})`; //Abed's code
          //document.getElementById('weather-layout').style.backgroundImage = `url(${imgURL})`; // check this to fix: https://stackoverflow.com/questions/60958997/uncaught-in-promise-typeerror-cannot-read-property-style-of-null
        });

    //fetch weather based on input
    const futureWeatherURL = `https://api.weatherapi.com/v1/forecast.json?key=c1c493a1ed79402aa6090757230402&q=${city}&days=7`;
    fetch(futureWeatherURL)
    .then(response => response.json())
    .then((weather) => {
        console.log(weather);

        //extract the weather data & create for loop to fill in the html elements
        const searchedCity = weather.location.name;
        console.log(`City: ${searchedCity}`);
        
        const fetchedWeatherArray = weather.forecast.forecastday;

        for (let i = 0; i < fetchedWeatherArray.length; i++) {
            
            if (currentDay + i < 6) {
                weekday = currentDay + i;
            }
            else {
                weekday = (currentDay + i) - 7;
            }
            weekday.toString();

            const date = fetchedWeatherArray[i].date; //index 0 is today, 1 tomorrow ...
            console.log(`Date: ${date}`);
            
            const iconURL = fetchedWeatherArray[i].day.condition.icon;
            console.log(iconURL);
    
            const maxTemp = fetchedWeatherArray[i].day.maxtemp_c;
            const minTemp = fetchedWeatherArray[i].day.mintemp_c;
            avgTemp = (maxTemp+minTemp)/2;
            console.log(`Average Temperature: ${avgTemp}°C`);

            //fill in missing html
            //document.getElementById(weekday).children.p.date.innerHTML = date; //currently not working! Can't access the html (even what's in normal html file)
        }
    })
})

// const pastWeatherURL = `https://api.weatherapi.com/v1/history.json?key=c1c493a1ed79402aa6090757230402&q=${city}&days=3`;