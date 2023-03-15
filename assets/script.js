var APIkey = "c326910f6a746fccb2e7c1a25284b9cd";
var city;
var searchBtn = document.getElementById('#location-search');
var searchInput = document.getElementById('#location-input');

function searchLocation() {
    console.log(searchInput);
}

searchBtn.addEventListener("click", searchLocation);