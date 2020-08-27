const weatherapi = {
    key: "84f8325f5f52a670b0e88f0fc8e456aa",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// 13 signifies enter key
function setQuery(evt) {
    if (evt.keyCode == 13) {
        // Finds weather of entered location
        findResults(searchbox.value)
    }
}

function findResults(query) {

    fetch(`${weatherapi.base}weather?q=${query}&units=imperial&APPID=${weatherapi.key}`)
    .then(weather => weather.json()) 
    .then(showResults)

}

function showResults(weather) {
    let city = document.querySelector('.location .city');

    try{
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    }
    catch{
        alert("Cannot find city");
    }

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.stats .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.stats .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.stats .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;

    let humidity = document.querySelector('.stats .humidity');
    humidity.innerText = `Humidity: ${weather.main.humidity}`;
    
    console.log(weather);
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
}

