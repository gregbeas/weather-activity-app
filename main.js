import './style.css'

import { getWeather } from './weather'
import { ICON_MAP } from './iconMap';

getWeather(35, 118, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch(e => {
    console.error(e);
    alert("Error getting weather data for your location.")
  })

function renderWeather({current, daily}) {
  renderCurrentWeather(current);
  // renderDailyWeather(daily);
  document.getElementById('weather-section').classList.remove('blurred');
}

function setValue(selector, value, {parent = document} = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `images/weather-icons/${ICON_MAP.get(iconCode)}.svg`
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


