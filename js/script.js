//store api key
var apiKey = "b8e22ed830ec486c66d2214fabd24fbd";
//hooks into html
var searchBtn = document.querySelector("#search-btn");
var citiesBtn = document.querySelector(".citiesBtn");
var showSection = document.querySelector(".show");
var list = document.querySelector(".list");
var list1 = document.querySelector(".list1");
var list2 = document.querySelector(".list2");
var list3 = document.querySelector(".list3");
var list4 = document.querySelector(".list4");
var searchValueHeader = document.querySelector(".searchValueHeader");
var date = document.querySelector(".date");

//empty array to add to later
var cities = [];

//searches value
function searchVal (){
    //lowercase trimmed search input value
    var searchValue = document.querySelector("#search-val").value.trim().toLowerCase();
    
    saveSearchVal(searchValue);
    getCurrentWeather(searchValue);
}

//uses search term to get weather
function getCurrentWeather (searchValue){
    //dynamic url using search input and api key
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;

    //fetches from url
    fetch(queryUrl)
    .then(function(res) {
        //returns data in json format
        return res.json();
    })
    .then(function(data) {
        //logs data that comes back
     console.log(data);
     //grabs lattitude and longitude from data and sets to variable
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    // console.log(lat);
    // console.log(lon);
    //uses lat and long variables to get coordinates of city
    getCoords(lat, lon, searchValue);
    })
    //catches error
    .catch (function(error) {
        //displays error on screen
        console.error(error)
    })
}

//uses lat and lon to get city from coords
function getCoords (lat, lon, searchValue){
    //dynamic url
        coordsUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;
        
        //fetches data from url
            fetch(coordsUrl)
            .then(function (res){
                //returns data in json format
                return res.json();
            })
            .then(function(data) {
                //logs data
                console.log(data);
                //if no data, alerts to no city found
              if(data[0] = null){
                  alert("No location found");
              }else{
                  //gets weather from api and sets to variables
                  var temp = JSON.parse(data.current.temp);
                  //converts K to F
                  temp = (((temp - 273.15) * (9/5)) + 32).toFixed(1);
                  var wind = JSON.parse(data.current.wind_speed);
                  var hum = JSON.parse(data.current.humidity);
                  var uvi = JSON.parse(data.current.uvi);
                  //appends to page
                  searchValueHeader.innerHTML = searchValue;
                  date.innerHTML = moment().format("MM/DD/YY");
                  
                  list1.innerHTML = "Temperature: " + temp + "°";
                  list2.innerHTML = "Wind: " + wind + " MPH";
                  list3.innerHTML = "Humidity: " + hum + " %";
                  list4.innerHTML = "UV Index: " + uvi;
                //  getCurrentWeather(data[0]);
              }
               })
               .catch (function(error) {
                   console.error(error);
               })  
        }

 function saveSearchVal (searchValue) {
             cities.push(searchValue);

//for (var i = 0; i < cities.length; i++){
        
            //if(cities.indexOf(cities[i]) !== cities.lastIndexOf(cities[i])){
            //    if(hasDuplicates(cities)){
//}
            localStorage.setItem("Cities", cities);
            var cityBtn = document.createElement("button");
            cityBtn.textContent = searchValue; 
            citiesBtn.appendChild(cityBtn);
            citiesBtn.addEventListener("click", searchVal);
           
            }

//event listener to search click
searchBtn.addEventListener("click", searchVal);