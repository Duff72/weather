let weatherData;
let currentDate = new Date();




document.getElementById('zipEntry').addEventListener('submit', function(event) {
    event.preventDefault();
    let zipCode = document.getElementById('zipCode').value; 
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=174fd4c46bfc829de300c5fc4b4a8642`)
      .then(response => response.json())
      .then(data => {
        let longitude = data.lon;
        let latitude = data.lat;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=174fd4c46bfc829de300c5fc4b4a8642&units=imperial
`
        )
          .then(response => response.json())
          .then(weatherData => {
            globalThis.weatherData = weatherData;
            displayWeather();
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
});

document.getElementById('btn2').addEventListener('click', displayWeather);

function displayWeather() {
    console.log(globalThis.weatherData);
    document.getElementById('output').innerHTML = `<ul id="output" class="list-group">
        <li class="list-group-item">Current Date: ${currentDate.toLocaleDateString()}</li>
        <li class="list-group-item">City: ${globalThis.weatherData.name}</li>
        <li class="list-group-item">Current Temperature: ${globalThis.weatherData.main.temp} &deg;F</li>
        <li class="list-group-item">Current Conditions: ${globalThis.weatherData.weather[0].description}</li>
        <li class="list-group-item">Temp Hi/Lo: ${globalThis.weatherData.main.temp_max}&deg;F / ${globalThis.weatherData.main.temp_min}&deg;F</li>
      </ul>`



}