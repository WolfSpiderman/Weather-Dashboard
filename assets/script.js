var APIkey = "c326910f6a746fccb2e7c1a25284b9cd";
var city;
var searchBtn = document.querySelector('#location-search');
var searchInput = document.querySelector('#location-input');
var lat = 0.0;
var lon = 0.0;
var days = document.querySelectorAll('.days');
var day1date = document.querySelector('#day1-date');
var day1stats = document.querySelector('#day1-stats');
var day2date = document.querySelector('#day2-date');
var day2stats = document.querySelector("#day2-stats");
var day3date = document.querySelector('#day3-date');
var day3stats = document.querySelector('#day3-stats');
var day4date = document.querySelector('#day4-date');
var day4stats = document.querySelector('#day4-stats');
var day5date = document.querySelector('#day5-date');
var day5stats = document.querySelector('#day5-stats')

function searchLocation() {
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
}

searchBtn.addEventListener('click', searchLocation);