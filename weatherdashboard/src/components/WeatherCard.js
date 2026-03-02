import "./WeatherCard.css";

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>🌡️ Temp: {weather.main.temp} °C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>
        ☁️ Condition: {weather.weather[0].description}
      </p>
    </div>
  );
}

export default WeatherCard;