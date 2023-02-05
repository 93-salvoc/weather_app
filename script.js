

const searchForm = document.querySelector(".search-box");

searchForm.addEventListener('submit', (getWeatherAndImg) => {
    getWeatherAndImg.preventDefault(); //to prevent this function from running right away when the site is called (this would be default with "submit")
    
    //get input and save in city variable
    const city = document.getElementById("city-home").value;
    console.log(city);

    //update html - template
    document.body.innerHTML = 
        `Yikes, I ended up in javascript :O`;
    
    //fetch img based on input
    fetch(`https://api.unsplash.com/search/photos/?client_id=2kd3ZjVt5tGBAlH0KMTER7YQwBnVlRIImLRYgoD3yPM&query=${city}`) //Is it ok to use Abed's key here?
        .then((response) => response.json())
        .then((data) => {
          let randomIndex = Math.floor(Math.random() * data.results.length);
          const imgURL = data.results[randomIndex].urls.regular;
          console.log(imgURL);
          //set img as background of #weather-layout
          document.body.style.backgroundImage = `url(${imgURL})`; //fix this
        });

    //fetch weather based on input

    //extract the weather data

    //fill in missing html

})

//const currentWeatherURL = `https://api.weatherapi.com/v1/current.json?key=c1c493a1ed79402aa6090757230402&q=${city}`
// const futureWeatherURL = `https://api.weatherapi.com/v1/forecast.json?key=c1c493a1ed79402aa6090757230402&q=${city}&days=3`;
// const pastWeatherURL = `https://api.weatherapi.com/v1/history.json?key=c1c493a1ed79402aa6090757230402&q=${city}&days=3`;

// fetch(futureWeatherURL)
//     .then(response => response.json())
//     .then((weather) => {
//         console.log(weather);
//         //document.createElement("p") = data.location.name;
//         //document.body.appendChild
//         // icon.src = data.current.condition.icon;
//         // condition.innerText = data.current.condition.text;
//         // temp.innerText = data.current.temp_c + "°C";
//     })
