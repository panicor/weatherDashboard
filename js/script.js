//stores api key
var apiKey = "b8e22ed830ec486c66d2214fabd24fbd";
//hooks into html
var searchBtn = document.querySelector("#search-btn");
var citiesList = document.querySelector(".citiesBtn");
var showSection = document.querySelector(".show");
var list = document.querySelector(".list");
var list1 = document.querySelector(".list1");
var list2 = document.querySelector(".list2");
var list3 = document.querySelector(".list3");
var list4 = document.querySelector(".list4");
var searchValueHeader = document.querySelector(".searchValueHeader");
var date = document.querySelector(".date");
var uviContainer = document.querySelector(".uvi");
var dayContainer = document.querySelector(".dayContainer");
var dayOne = document.querySelector(".dayOne");
var day1 = document.querySelector(".day1");
var day11 = document.querySelector(".day11");
var day111 = document.querySelector(".day111");
var dayTwo = document.querySelector(".day2");
var day2 = document.querySelector(".day2");
var day22 = document.querySelector(".day22");
var day222 = document.querySelector(".day222");
var dayThree = document.querySelector(".day3");
var day3= document.querySelector(".day3");
var day33 = document.querySelector(".day33");
var day333 = document.querySelector(".day333");
var dayFour = document.querySelector(".day4");
var day4 = document.querySelector(".day4");
var day44 = document.querySelector(".day44");
var day444 = document.querySelector(".day444");
var dayFive = document.querySelector(".day5");
var day5 = document.querySelector(".day5");
var day55 = document.querySelector(".day55");
var day555 = document.querySelector(".day555");
var day1Header = document.querySelector(".day1Header");
var day2Header = document.querySelector(".day2Header");
var day3Header = document.querySelector(".day3Header");
var day4Header = document.querySelector(".day4Header");
var day5Header = document.querySelector(".day5Header");
var headerHeader = document.querySelector(".headerHeader")

//empty array to add to later
var cities = [];

//searches value
function searchVal (){
    //lowercase trimmed search input value
    var searchValue = document.querySelector("#search-val").value.trim().toLowerCase();
    //calls other functions using input value
    var newButton = createCityButton(searchValue);
    citiesList.appendChild(newButton);
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
     //grabs lattitude and longitude from data and sets to variable
    var lat = data.coord.lat;
    var lon = data.coord.lon;
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
                //if no data, alerts to no city found
              if(data[0] = null){
                  alert("Location not found");
                  //if location is found, do this
              }else{
                // 5 day forecast
                headerHeader.innerHTML = "5 Day Forecast: ";
                //sets date to day ahead
                day1Header.innerHTML = moment().add(1,"day").format("MM/DD/YY");
                var temp1 = JSON.parse(data.daily[0].temp.day);
                //converts K to F
                temp1 = (((temp1 - 273.15) * (9/5)) + 32).toFixed(1);
                var wind1 = JSON.parse(data.daily[0].wind_speed);
                var hum1 = JSON.parse(data.daily[0].humidity);
                day1.innerHTML = "Temperature: " + temp1 + "°";
                day11.innerHTML= "Wind: " + wind1 + " MPH";
                day111.innerHTML = "Humidity: " + hum1 + " %";

                day2Header.innerHTML = moment().add(2,"day").format("MM/DD/YY");
                var temp2 = JSON.parse(data.daily[1].temp.day);
                //converts K to F
                temp2 = (((temp2 - 273.15) * (9/5)) + 32).toFixed(1);
                var wind2 = JSON.parse(data.daily[1].wind_speed);
                var hum2 = JSON.parse(data.daily[1].humidity);
                day2.innerHTML = "Temperature: " + temp2 + "°";
                day22.innerHTML= "Wind: " + wind2 + " MPH";
                day222.innerHTML = "Humidity: " + hum2 + " %";

                day3Header.innerHTML = moment().add(3,"day").format("MM/DD/YY");
                var temp3 = JSON.parse(data.daily[2].temp.day);
                //converts K to F
                temp3 = (((temp3 - 273.15) * (9/5)) + 32).toFixed(1);
                var wind3 = JSON.parse(data.daily[2].wind_speed);
                var hum3 = JSON.parse(data.daily[2].humidity);
                day3.innerHTML = "Temperature: " + temp3 + "°";
                day33.innerHTML= "Wind: " + wind3 + " MPH";
                day333.innerHTML = "Humidity: " + hum3 + " %";

                day4Header.innerHTML = moment().add(4,"day").format("MM/DD/YY");
                var temp4 = JSON.parse(data.daily[3].temp.day);
                //converts K to F
                temp4 = (((temp4 - 273.15) * (9/5)) + 32).toFixed(1);
                var wind4 = JSON.parse(data.daily[3].wind_speed);
                var hum4 = JSON.parse(data.daily[3].humidity);
                day4.innerHTML = "Temperature: " + temp4 + "°";
                day44.innerHTML= "Wind: " + wind4 + " MPH";
                day444.innerHTML = "Humidity: " + hum4 + " %";

                day5Header.innerHTML = moment().add(5,"day").format("MM/DD/YY");
                var temp5 = JSON.parse(data.daily[4].temp.day);
                //converts K to F
                temp5 = (((temp5 - 273.15) * (9/5)) + 32).toFixed(1);
                var wind5 = JSON.parse(data.daily[4].wind_speed);
                var hum5 = JSON.parse(data.daily[4].humidity);
                day5.innerHTML = "Temperature: " + temp5 + "°";
                day55.innerHTML= "Wind: " + wind5 + " MPH";
                day555.innerHTML = "Humidity: " + hum5 + " %";


                  //gets weather from api and sets to variables
                  var temp = JSON.parse(data.current.temp);
                  //converts K to F
                  temp = (((temp - 273.15) * (9/5)) + 32).toFixed(1);
                  var wind = JSON.parse(data.current.wind_speed);
                  var hum = JSON.parse(data.current.humidity);
                  var uvi = JSON.parse(data.current.uvi);
                  //appends to page

                  //adds search val and date to page
                  searchValueHeader.innerHTML = searchValue;
                  date.innerHTML = moment().format("MM/DD/YY");
                  
                  //adds weather data to page
                  list1.innerHTML = "Temperature: " + temp + "°";
                  list2.innerHTML = "Wind: " + wind + " MPH";
                  list3.innerHTML = "Humidity: " + hum + " %";
                  list4.innerHTML = "UV Index: " + uvi;


                  //sets colors to uv background and changes text color
                  if (uvi <= 2.5){
                   list4.style.backgroundColor = "green";
                   list4.style.color = "white";
                  }
                  else if (uvi > 2.5 && uvi <= 5.5){
                    list4.style.backgroundColor = "yellow";
                }
                  else if (uvi > 5.5 && uvi <= 7.5){
                    list4.style.backgroundColor = "orange";
                }
                  else {
                    list4.style.backgroundColor = "red";
                    list4.style.color = "white";
            }
              }
               })
               //catches errors
               .catch (function(error) {
                   console.error(error);
               })  
        }

function saveSearchVal (searchValue) {
    //pushes search value to cities array
    cities.push(searchValue);
    //saves to local storage
    localStorage.setItem("cities", cities);
          
 }

//creates button with search value
function createCityButton(name) {
    var newButton = document.createElement('button');
    //value and html sset to input name
    newButton.value = name;
    newButton.innerHTML =  name;
    //event listener to history buttons
    newButton.addEventListener('click', function(event){
        var cityName = event.target.value;
        //gets weather from button value
        getCurrentWeather(cityName);
    })
    //returns button
    return newButton;
}
          

//event listener to search click
searchBtn.addEventListener("click", function(event) {
    searchVal();
});

