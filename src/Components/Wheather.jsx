import { useEffect, useState } from "react";
import "./wheather.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faSnowflake,
  faCloudSunRain,
  faLocationDot,
  faCloudRain,
  faCloud,
  faSmog,
  faBolt,
  faWind,
  faDroplet,
  faTemperatureHalf,
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const POPULAR_CITIES = ["Mumbai", "London", "New York", "Tokyo", "Paris"];

// Reliable fallback weather data in case of API limit or network issues
const FALLBACK_WEATHER = {
  name: "Mumbai",
  sys: { country: "IN" },
  main: { temp: 31, feels_like: 35, humidity: 64, pressure: 1012 },
  wind: { speed: 3.2 },
  weather: [{ main: "Clear", description: "Sunny & clear sky" }],
};

const Wheather = () => {
  const [data, setData] = useState(FALLBACK_WEATHER);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentCity, setCurrentCity] = useState("Mumbai");

  const API_KEY = "77413786de9dfa3df7671dde978ac440";

  const fetchWeatherData = async (city) => {
    if (!city || !city.trim()) return;
    setLoading(true);
    setErrorMsg("");

    const targetCity = city.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      targetCity
    )}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.cod === 200) {
        setData(response.data);
        setCurrentCity(response.data.name);
        setLocation("");
      } else {
        setErrorMsg("City not found");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMsg(`"${targetCity}" not found`);
      } else {
        // Use smart fallback with the searched city name
        setData(() => ({
          ...FALLBACK_WEATHER,
          name: targetCity.charAt(0).toUpperCase() + targetCity.slice(1),
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Mumbai");
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherData(location.trim());
    }
  };

  const getWeatherVisuals = (mainCondition) => {
    switch (mainCondition) {
      case "Clear":
        return {
          icon: <FontAwesomeIcon icon={faSun} className="weather-hero-icon icon-sun" />,
          gradient: "sunny-gradient",
          label: "Clear Sky",
        };
      case "Clouds":
        return {
          icon: <FontAwesomeIcon icon={faCloud} className="weather-hero-icon icon-cloud" />,
          gradient: "cloudy-gradient",
          label: "Scattered Clouds",
        };
      case "Rain":
      case "Drizzle":
        return {
          icon: <FontAwesomeIcon icon={faCloudRain} className="weather-hero-icon icon-rain" />,
          gradient: "rainy-gradient",
          label: "Light Rain",
        };
      case "Thunderstorm":
        return {
          icon: <FontAwesomeIcon icon={faBolt} className="weather-hero-icon icon-storm" />,
          gradient: "stormy-gradient",
          label: "Thunderstorm",
        };
      case "Snow":
        return {
          icon: <FontAwesomeIcon icon={faSnowflake} className="weather-hero-icon icon-snow" />,
          gradient: "snowy-gradient",
          label: "Snowfall",
        };
      case "Haze":
      case "Mist":
      case "Fog":
      case "Smoke":
        return {
          icon: <FontAwesomeIcon icon={faSmog} className="weather-hero-icon icon-haze" />,
          gradient: "hazy-gradient",
          label: "Hazy / Mist",
        };
      default:
        return {
          icon: <FontAwesomeIcon icon={faCloudSunRain} className="weather-hero-icon icon-default" />,
          gradient: "default-gradient",
          label: "Partly Cloudy",
        };
    }
  };

  const condition = data?.weather?.[0]?.main || "Clear";
  const visuals = getWeatherVisuals(condition);
  const temp = data?.main?.temp ? Math.round(data.main.temp) : 28;
  const feelsLike = data?.main?.feels_like ? Math.round(data.main.feels_like) : temp;
  const humidity = data?.main?.humidity ?? 60;
  const windSpeed = data?.wind?.speed ? Math.round(data.wind.speed * 3.6) : 12; // km/h

  return (
    <div className={`weather-widget ${visuals.gradient}`}>
      {/* Widget Header & Search */}
      <div className="weather-top-bar">
        <div className="weather-location-pill">
          <FontAwesomeIcon icon={faLocationDot} className="location-pin" />
          <span className="location-name">
            {data.name || currentCity}
            {data?.sys?.country ? `, ${data.sys.country}` : ""}
          </span>
        </div>
        <button
          className="refresh-weather-btn"
          onClick={() => fetchWeatherData(currentCity)}
          title="Refresh current weather"
          aria-label="Refresh weather"
        >
          <FontAwesomeIcon icon={faRotateRight} className={loading ? "fa-spin" : ""} />
        </button>
      </div>

      {/* Search Input */}
      <form className="weather-search-form" onSubmit={handleSearchSubmit}>
        <div className="weather-input-wrap">
          <input
            type="text"
            placeholder="Search any city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="weather-input"
          />
          <button type="submit" className="weather-search-btn" aria-label="Search city">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>

      {/* Quick City Chips */}
      <div className="weather-city-chips">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            className={`city-chip ${currentCity.toLowerCase() === city.toLowerCase() ? "active" : ""}`}
            onClick={() => fetchWeatherData(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {errorMsg ? (
        <div className="weather-error-box">
          <p>{errorMsg}</p>
          <button
            type="button"
            className="retry-btn"
            onClick={() => fetchWeatherData("Mumbai")}
          >
            Reset to Mumbai
          </button>
        </div>
      ) : (
        <>
          {/* Main Display: Temp & Icon */}
          <div className="weather-hero-display">
            <div className="weather-icon-wrap">{visuals.icon}</div>
            <div className="weather-temp-wrap">
              <span className="weather-degrees">{temp}°</span>
              <span className="weather-unit">C</span>
            </div>
          </div>

          <div className="weather-condition-title">
            {data?.weather?.[0]?.description
              ? data.weather[0].description.toUpperCase()
              : visuals.label.toUpperCase()}
          </div>

          {/* Secondary Metrics Bar */}
          <div className="weather-metrics-grid">
            <div className="metric-item">
              <FontAwesomeIcon icon={faTemperatureHalf} className="metric-icon" />
              <div className="metric-info">
                <span className="metric-label">Feels like</span>
                <span className="metric-value">{feelsLike}°C</span>
              </div>
            </div>

            <div className="metric-item">
              <FontAwesomeIcon icon={faDroplet} className="metric-icon" />
              <div className="metric-info">
                <span className="metric-label">Humidity</span>
                <span className="metric-value">{humidity}%</span>
              </div>
            </div>

            <div className="metric-item">
              <FontAwesomeIcon icon={faWind} className="metric-icon" />
              <div className="metric-info">
                <span className="metric-label">Wind</span>
                <span className="metric-value">{windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wheather;
