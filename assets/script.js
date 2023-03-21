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
var day1date = document.querySelector('#day1-date');
var day1stats = document.querySelector('#day1-stats');
var day2date = document.querySelector('#day2-date');
var day2stats = document.querySelector("#day2-stats");
var day3date = document.querySelector('#day3-date');
var day3stats = document.querySelector('#day3-stats');
var day4date = document.querySelector('#day4-date');
var day4stats = document.querySelector('#day4-stats');
var day5date = document.querySelector('#day5-date');
var day5stats = document.querySelector('#day5-stats');
var searchHistory = [];
var historyBtn = document.querySelectorAll('.historyBtn');
var weather = document.querySelector('.weather');

function searchLocation() {
    [].forEach.call(weather.querySelectorAll('li'),function(e){
        e.parentNode.removeChild(e);
      });

    console.log(searchInput);
    city = searchInput.value;
    console.log(city);
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
            localStorage.setItem("Search-History", searchHistory);
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
        todayImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png");
        var todayStatsList = ["Temp: " + data.list[0].main.temp + "°F", "Feels like: " + data.list[0].main.feels_like + "°F", "Wind: " + data.list[0].wind.speed + "mph", "Humidity: " + data.list[0].main.humidity + "%"];
        for (i = 0; i < todayStatsList.length; i++) {
            var newTodayStat = document.createElement('li');
            newTodayStat.textContent = todayStatsList[i];
            todayStats.append(newTodayStat);
        }
        console.log(days);
        for (i = 0; i < days.length; i++) {
            var statsList = ["Temp: " + data.list[(i * 8)].main.temp + "°F", "Wind: " + data.list[i * 8].wind.speed + "mph", "Humidity: " + data.list[(i * 8)].main.humidity + "%"];
            for (j = 0; j < statsList.length; j++) {
                var newStat = document.createElement('li');
                newStat.textContent = statsList[j];
                var eachDay = document.querySelector('#day' + (i+1) + '-stats');
                eachDay.append(newStat);
                console.log(j, eachDay);
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
    console.log(data);
    console.log(days);
    for (i = 0; i < days.length; i++) {

    }
});
}

searchBtn.addEventListener('click', searchLocation);

document.addEventListener('click', historySearch);