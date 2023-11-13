import axios from 'axios';

import { getWeather } from './getWeather'
import { ICON_MAP } from './iconMap';

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({coords}) {
  getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(getLocation(coords.latitude, coords.longitude))
    .then(renderWeather)
    .catch(e => {
      console.error(e);
      alert("Error getting weather data for your location.")
    })
}

function positionError() {
  alert('There was an error accessing your location. Please check browser permisions and refresh the page.')
}

function getLocation(lat, lon) {
  return axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
  .then(res => {
    currentLocation.innerHTML = `${res.data.locality}, ${res.data.principalSubdivision}`;
  })
}

const currentLocation = document.querySelector('[data-current-location]');

function renderWeather({current, daily}) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  document.getElementById('weather-section').classList.remove('blurred');
}

function setValue(selector, value, {parent = document} = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `../images/weather-icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector('[data-current-icon]');

function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode);
  setValue('current-temp', current.currentTemp);
  setValue('current-high', current.highTemp);
  setValue('current-low', current.lowTemp);
  setValue('current-humidity', current.humidity);
  setValue('current-wind', current.windSpeed);
  setValue('current-uv-index', current.uvIndex);
  setValue('current-precip', current.precip);
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday: 'long'});

const dailySection = document.querySelector('[data-day-section]');
const dayCardTemplate = document.getElementById('day-card-template');

function renderDailyWeather(daily) {
  dailySection.innerHTML = '';
  daily.forEach(day => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue('temp-high', day.maxTemp, {parent: element});
    setValue('temp-low', day.minTemp, {parent: element});
    setValue('date', DAY_FORMATTER.format(day.timestamp), {parent: element});
    element.querySelector('[data-icon]').src = getIconUrl(day.iconCode);
    dailySection.append(element);
  })
}



