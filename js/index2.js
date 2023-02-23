var apiKey = "3bf5c91d454e4418889202932232202";
var country = document.querySelector("#country");
var weatherResultsRow = document.querySelector(".weather-results .row");

async function getWeather(countryName) {
  countryName = country.value;

  if (country.value.length >= 3) {
    var weather = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${countryName}&days=3&aqi=no&alerts=no`
    );
    if (weather.status == 400) {
      console.log(weather.statusText);
    } else if (weather.status == 200) {
      var result = await weather.json();
      displayWeather(result);
    }
  }
}
country.addEventListener("input", function () {
  getWeather();
});
getWeather();

function displayWeather(weather) {
  var weatherResults = "";
  var forecastArray = weather.forecast.forecastday;
  for (var i = 0; i < forecastArray.length; i++) {
    weatherResults += `
    <div class="col-4">
    <div class="card">
      <div class="card-header">
      <span class="weather-day ">${changeDateToDay(
        forecastArray[i].date
      )}</span>
      ${
        i == 0
          ? `<span class="weather-date">${forecastArray[i].date}</span>`
          : ``
      }
      </div>
      <div class="card-body ${i != 0 ? `text-center` : ``}">
   
      ${
        i == 0
          ? `<h5 class="card-title location-name">${weather.location.name}</h5>
          
          <h3 class=" current-temp card-text d-inline-block">${weather.current.temp_c} <sup>o</sup>C</h3>
         `
          : ` `
      }
      <img src="${forecastArray[i].day.condition.icon}" width="50" height="50"/>
      <div class="clear"></div>
      ${
        i != 0
          ? `<h5 class="card-text forecast-max-temp ">${forecastArray[i].day.maxtemp_c} <sup>o</sup>C</h5>
          <p class="forecast-min-temp"> ${forecastArray[i].day.mintemp_c} <sup>o</sup>C</p>`
          : ` `
      }
      <p class="forecast-condition-text">${
        forecastArray[i].day.condition.text
      }</p>
  ${
    i == 0
      ? ` <ul>
      <li><span><i class="fa-solid fa-wind"></i></span>${weather.current.humidity}</li>
    <li><span><i class="fa-solid fa-wind"></i></span>${weather.current.wind_kph}</li>
    <li><span><i class="fa-regular fa-compass"></i></span>${weather.current.wind_dir}</li>
    </ul>
    `
      : ``
  }
        
      </div>
    </div>
    </div>`;
  }
  weatherResultsRow.innerHTML = weatherResults;
}
function changeDateToDay(day) {
  var dateDay = new Date(day).toLocaleString("en-us", {
    weekday: "long",
  });
  return dateDay;
}
