var APIkey = "c326910f6a746fccb2e7c1a25284b9cd";
var city;
var searchBtn = document.querySelector('#location-search');
var searchInput = document.querySelector('#location-input');
var lat = 0.0;
var lon = 0.0;
var history = document.querySelector('#location-history');
var days = document.querySelectorAll('.days');
var todayDate = document.querySelector('#today-city-date');
var todayStats = document.querySelector('#today-stats');
var todayImg = document.querySelector('#today-img');
var searchHistory;
var historyBtn = document.querySelectorAll('.historyBtn');
var weather = document.querySelector('.weather');

function renderButtons() {
    if (localStorage.getItem("Search-History") == null) {
        searchHistory = [];
    } else {
        searchHistory = JSON.parse(localStorage.getItem("Search-History"));
        console.log(searchHistory);
        for (i = 0; i < searchHistory.length; i++) {
            city = searchHistory[i];
                var newHistoryItem = document.createElement('li');
                var newHistoryBtn = document.createElement('button');
                var history = document.querySelector('#location-history');
                history.append(newHistoryItem);
                newHistoryItem.append(newHistoryBtn);
                newHistoryBtn.setAttribute('class', 'historyBtn');
                newHistoryBtn.textContent = city;
        }
    }
}

function searchLocation() {
    // resets the weather stats
    [].forEach.call(weather.querySelectorAll('li'),function(e){
        e.parentNode.removeChild(e);
      });

    city = searchInput.value;
    // http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}  zip api call url, for future feature addition
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIkey;
    if (city !== "") {
        fetch(geoURL)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            city = data[0].name;
            var newHistoryItem = document.createElement('li');
            var newHistoryBtn = document.createElement('button');
            var history = document.querySelector('#location-history');
            history.append(newHistoryItem);
            newHistoryItem.append(newHistoryBtn);
            newHistoryBtn.setAttribute('class', 'historyBtn');
            newHistoryBtn.textContent = city;
            searchHistory.push(city);
            console.log(searchHistory);
            localStorage.setItem("Search-History", JSON.stringify(searchHistory));
            console.log(data)
            console.log(data[0].lat, data[0].lon);
            lat = data[0].lat;
            lon = data[0].lon;
            return fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&units=imperial");
    })
    .then(function (response1) {
        return response1.json();
    })
    .then(function (data) {
        console.log(data);
        todayDate.textContent = data.city.name + " " + dayjs().format('MM/DD/YY');
        todayImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@4x.png");
        var todayStatsList = ["Temp: " + data.list[0].main.temp + "°F", "Feels like: " + data.list[0].main.feels_like + "°F", "Wind: " + data.list[0].wind.speed + "mph", "Humidity: " + data.list[0].main.humidity + "%"];
        for (i = 0; i < todayStatsList.length; i++) {
            var newTodayStat = document.createElement('li');
            newTodayStat.textContent = todayStatsList[i];
            todayStats.append(newTodayStat);
        }
        console.log(days);
        for (i = 1; i <= days.length; i++) {
            var statsList = ["Temp: " + data.list[((i * 8) - 1)].main.temp + "°F", "Wind: " + data.list[((i * 8) - 1)].wind.speed + "mph", "Humidity: " + data.list[((i * 8) - 1)].main.humidity + "%"];
            var dates = dayjs().add(i, 'day').format('MM/DD/YY');
            var date = document.querySelector('#day' + i + '-date');
            date.textContent = dates;
            var dayImg = document.querySelector('#day' + i + '-img');
            dayImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[((i * 8) - 1)].weather[0].icon + ".png");
            for (j = 0; j < statsList.length; j++) {
                var newStat = document.createElement('li');
                newStat.textContent = statsList[j];
                var eachDay = document.querySelector('#day' + i + '-stats');
                eachDay.append(newStat);
            }
        }
    });
    }
}

function historySearch(event) {
    if (!event.target.matches('.historyBtn')) return;
    [].forEach.call(weather.querySelectorAll('li'),function(e){
        e.parentNode.removeChild(e);
      });
    city = event.target.textContent;
    console.log(city);
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIkey;

    fetch(geoURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        console.log(data[0].lat, data[0].lon);
        lat = data[0].lat;
        lon = data[0].lon;
        return fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&units=imperial");
    })
    .then(function (response1) {
        return response1.json();
    })
    .then(function (data) {
        todayDate.textContent = data.city.name + " " + dayjs().format('MM/DD/YY');
        todayImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@4x.png");
        var todayStatsList = ["Temp: " + data.list[0].main.temp + "°F", "Feels like: " + data.list[0].main.feels_like + "°F", "Wind: " + data.list[0].wind.speed + "mph", "Humidity: " + data.list[0].main.humidity + "%"];
        for (i = 0; i < todayStatsList.length; i++) {
            var newTodayStat = document.createElement('li');
            newTodayStat.textContent = todayStatsList[i];
            todayStats.append(newTodayStat);
        }
        console.log(days);
        for (i = 1; i <= days.length; i++) {
            var statsList = ["Temp: " + data.list[((i * 8) - 1)].main.temp + "°F", "Wind: " + data.list[((i * 8) - 1)].wind.speed + "mph", "Humidity: " + data.list[((i * 8) - 1)].main.humidity + "%"];
            var dates = dayjs().add(i, 'day').format('MM/DD/YY');
            var date = document.querySelector('#day' + i + '-date');
            date.textContent = dates;
            var dayImg = document.querySelector('#day' + i + '-img');
            dayImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[((i * 8) - 1)].weather[0].icon + ".png");
            for (j = 0; j < statsList.length; j++) {
                var newStat = document.createElement('li');
                newStat.textContent = statsList[j];
                var eachDay = document.querySelector('#day' + i + '-stats');
                eachDay.append(newStat);
            }
        }
    });
}

searchBtn.addEventListener('click', searchLocation);

document.addEventListener('click', historySearch);

renderButtons();