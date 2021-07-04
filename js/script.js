//store api key
var apiKey = "b8e22ed830ec486c66d2214fabd24fbd";
//hooks into html
var searchBtn = document.querySelector("#search-btn");
var citiesBtn = document.querySelector(".citiesBtn");
//empty array to add to later
var cities = [];

//searches value
function searchVal (){
    //lowercase trimmed search input value
    var searchValue = document.querySelector("#search-val").value.trim().toLowerCase();
    saveSearchVal(searchValue);
    getCurrentWeather(searchValue);
    
}

function getCurrentWeather (searchValue){
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;

    fetch(queryUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
     console.log(data);
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    // console.log(lat);
    // console.log(lon);
    getCoords(lat, lon);
    })
    .catch (function(err) {
        console.error(err)
    })
    
}


function getCoords (lat, lon){
        coordsUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;
        
            fetch(coordsUrl)
            .then(function (res){
                return res.json();
            })
            .then(function(data) {
                console.log(data);
              if(data[0] = null){
                  alert("No location found");
              }else{
                  
                  getCurrentWeather(data[0]);
              }
               })
               .catch (function(err) {
                   console.error(err);
               })
               
        }

 function saveSearchVal (searchValue) {
             cities.push(searchValue);

//for (var i = 0; i < cities.length; i++){
        
            //if(cities.indexOf(cities[i]) !== cities.lastIndexOf(cities[i])){
            //    if(hasDuplicates(cities)){
//}
            localStorage.getItem("Cities", cities);
            var cityBtn = document.createElement("button");
            cityBtn.textContent = searchValue; 
            citiesBtn.appendChild(cityBtn);
            console.log(cities); 
            citiesBtn.addEventListener("click", searchVal);
           
        }
      
        //localStorage.get();

searchBtn.addEventListener("click", searchVal);