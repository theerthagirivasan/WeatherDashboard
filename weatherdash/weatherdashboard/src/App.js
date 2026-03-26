import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "3f52c29fd2538273ae4f83abfa2e85ae"; // your key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Use the "find" API to get the first matching city
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (res.data.count === 0) {
        setError("City not found. Please check the name!");
      } else {
        // Take the first result
        setWeather(res.data.list[0]);
      }
    } catch (err) {
      setError("Error fetching data!");
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return "app clear";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "app clouds";
    if (main.includes("rain") || main.includes("drizzle")) return "app rain";
    if (main.includes("snow")) return "app snow";
    if (main.includes("storm") || main.includes("thunder")) return "app storm";
    return "app clear";
  };

  return (
    <div className={getBackgroundClass()}>
      <h1>Weather Dashboard</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <div className="loader"></div>}

      {error && <div className="error">{error}</div>}

      {weather && !loading && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p style={{ textTransform: "capitalize", fontSize: "1.3rem" }}>
            {weather.weather[0].description}
          </p>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {Math.round(weather.main.temp)}°C
          </p>
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;