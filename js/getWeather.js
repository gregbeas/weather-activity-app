import axios from "axios"

export function getWeather(lat, lon, timezone) {
  return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime", {params: {
    latitude: lat,
    longitude: lon,
    timezone,
  }})
  .then(({data}) => {
    console.log(data);
    return {
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
    }
  })
}

function parseCurrentWeather({current, daily}) {

  const {
    temperature_2m: currentTemp,
    wind_speed_10m: windSpeed,
    weather_code: iconCode,
    relative_humidity_2m: humidity
  } = current

  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    uv_index_max: [uvIndex],
    precipitation_sum: [precip]
  } = daily

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    humidity: Math.round(humidity),
    windSpeed: Math.round(windSpeed),
    uvIndex: Math.round(uvIndex),
    precip: Math.round(precip * 100) / 100,
    iconCode,
  }
}

function parseDailyWeather({daily}) {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weather_code[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index])
    }
  })
}