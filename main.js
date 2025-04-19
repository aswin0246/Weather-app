const api = {
  key: "a8cee1ce13b39fe4bd59cb2d96325b41",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // Change background based on temperature
  let temperature = weather.main.temp;
  let body = document.querySelector('body');

  if (temperature <= 0) {
    body.style.backgroundImage = "url('https://cdn.pixabay.com/animation/2022/11/08/06/19/06-19-11-383_512.gif')";
  } else if (temperature > 0 && temperature <= 15) {
    body.style.backgroundImage = "url('https://i.pinimg.com/originals/ef/b1/01/efb101b93d77eebfb2293bafd51fd699.gif')";
  } else if (temperature > 15 && temperature <= 25) {
    body.style.backgroundImage = "url('https://theyearofhalloween.com/wp-content/uploads/2014/09/fall-leaves-autumn-gif-1.gif')";
  } else if (temperature > 25) {
    body.style.backgroundImage = "url('https://i.pinimg.com/originals/5a/40/37/5a4037c5df4438f2e087eadb3eee03f2.gif')";
  }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
