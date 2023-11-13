import axios from 'axios';

//DOM elements
const activityButton = document.querySelector('[data-activity-button]');
const activityHeader = document.querySelector('[data-activity-header]');
const activityDataTemp = document.querySelector('[data-activity-temp]');
const activityDataWeather = document.querySelector('[data-weather-code]');
const activity = document.querySelector('[data-activity]');
const randomActivityElement = document.querySelector('[data-random-activity]');

//get current location
navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

//on location success
function positionSuccess({ coords }) {
  getActivityWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}

//on location error, alart to change browser permissions
function positionError() {
  alert(
    'There was an error accessing your location. Please check browser permisions and refresh the page.'
  );
}

//create random activty variable
let randomActivity;

//function to get random activity based on weather
function getRandomActivity() {
  const randomNummber = Math.floor(Math.random() * 4);

  if ((activityWeatherCode === 0 || activityWeatherCode === 1 || activityWeatherCode === 2 || activityWeatherCode === 3 || activityWeatherCode === 45) && activityTemp > 60) {
    return axios.get('http://www.boredapi.com/api/activity/')
    .then((res) => {
      randomActivity = res.data.activity;
      console.log(randomActivity);
    })
    .then(() => {
      updateActivity(randomActivity);
    })
  } else {
    if (randomNumber === 0) {
      return axios.get('http://www.boredapi.com/api/activity?type=education')
      .then(() => {
        randomActivity = res.data.activity;
        console.log(randomActivity);
      })
      .then(() => {
        updateActivity(randomActivity);
      })
    } else if (randomNumber === 1) {
      return axios.get('http://www.boredapi.com/api/activity?type=cooking')
      .then(() => {
        randomActivity = res.data.activity;
        console.log(randomActivity);
      })
      .then(() => {
        updateActivity(randomActivity);
      })
    } else if (randomNumber === 2) {
      return axios.get('http://www.boredapi.com/api/activity?type=busywork')
      .then(() => {
        randomActivity = res.data.activity;
        console.log(randomActivity);
      })
      .then(() => {
        updateActivity(randomActivity);
      })
    } else if (randomNumber === 3) {
      return axios.get('http://www.boredapi.com/api/activity?type=music')
      .then(() => {
        randomActivity = res.data.activity;
        console.log(randomActivity);
      })
      .then(() => {
        updateActivity(randomActivity);
      })
    }
  }
}

//helper function to update activity dom element
function updateActivity(random) {
  randomActivityElement.innerHTML = random;
}

//create empty weather variables
let activityTemp;
let activityWeatherCode;

//gets weather from API, updates then shows DOM element, and enables button, changes element instructions
function getActivityWeather(lat, lon, timezone) {
  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`
    )
    .then((res) => {
      activityTemp = Math.round(res.data.current.temperature_2m);
      activityWeatherCode = (res.data.current.weather_code);
      console.log(`Temp: ${activityTemp}, Weather Code: ${activityWeatherCode}`);
    }).then(() => {
      activityDataTemp.innerHTML = activityTemp;
      if (activityWeatherCode === 0 || activityWeatherCode === 1) {
        activityDataWeather.innerHTML = 'sunny';
      } else if (activityWeatherCode === 2 || activityWeatherCode === 3 || activityWeatherCode === 45 || activityWeatherCode === 48) {
        activityDataWeather.innerHTML = 'cloudy';
      } else if (activityWeatherCode === 51 || activityWeatherCode === 53 || activityWeatherCode === 55) {
        activityDataWeather.innerHTML = 'drizzling';
      } else if (activityWeatherCode === 61 || activityWeatherCode === 63 || activityWeatherCode === 65 || activityWeatherCode === 66 || activityWeatherCode === 67 || activityWeatherCode === 80 || activityWeatherCode === 81 || activityWeatherCode === 82) {
        activityDataWeather.innerHTML = 'raining';
      } else if (activityWeatherCode === 71 || activityWeatherCode === 73 || activityWeatherCode === 75 || activityWeatherCode === 85 || activityWeatherCode === 86) {
        activityDataWeather.innerHTML = 'snowing';
      } else if (activityWeatherCode === 77) {
        activityDataWeather.innerHTML - 'hailing';
      } else if (activityWeatherCode === 95 || activityWeatherCode === 96 || activityWeatherCode === 99) {
        activityDataWeather.innerHTML = 'there is a thunderstorm';
      }
    }).then(() => {
      activityButton.classList.remove('disabled');
      activityHeader.innerHTML = 'Press the button below to find something to do in your area';
      activity.setAttribute('data-visible', true);
      activityButton.addEventListener('click', getRandomActivity);
    })
}



