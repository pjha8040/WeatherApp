import React, { useEffect, useState } from "react";
import "./Weatherdynamic.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState({});
  const [iconUrl, setIconUrl] = useState("");

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      const icon = data.weather[0].icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        cityname: data.name,
        tempreture: Math.floor(data.main.temp),
      });
      const urlIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      setIconUrl(urlIcon);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setWeatherData({});
      setIconUrl("");
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  return (
    <div className="weather">
      {iconUrl && (
        <img src={iconUrl} className="weather-icon" alt="weather icon" />
      )}
      {weatherData.cityname && (
        <>
          <p className="tempreture">{weatherData.tempreture}°C</p>
          <p className="city-name">{weatherData.cityname}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind icon" />
              <div>
                <p>{weatherData.windspeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
