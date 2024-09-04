
import React, { useState } from 'react';
import { fetchWeather } from '../services/weatherService';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const data = await fetchWeather(city);
            setWeatherData(data);
            setError('');
        } catch (error) {
            setError('Failed to fetch weather data.');
            setWeatherData(null);
        }
    };

    return (
        <div className="weather-container">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleSearch}>Get Weather</button>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
