const API_KEY = "b3a5ce0be7c3d9140b6ba9d8f073ff10";

export async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  const data = await response.json();
  return data;
}