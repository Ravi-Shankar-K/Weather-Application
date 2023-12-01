
import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import Logo from '../Assets/logo.png';
import Logo2 from '../Assets/weather-today.jpg';
import TodayForecast from './TodayForecast';
import WeekForecast from './WeekForecast';
import search_icon from '../Assets/search.png';
import forecastHumidity from '../Assets/humidity.png';
import windSpeed from '../Assets/wind.png';
import uvIndex  from '../Assets/uv_index.png';
import feelsLike from '../Assets/feels_like.png'
import SkeletonComponent from './Skeletoncomponent';

const WeatherApp = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [searchValue, setSearchValue] = useState("Visakhapatnam");
    const [initialLoad, setInitialLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch weather data based on the 'location' state
    const fetchWeatherData = async (location) => {
        try {
            // const apiKey = 'c7ce290031a049839d8100457230411'; myown key
            const apiKey = 'b555f999564d40e6b6e133110232111';
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;
            const response = await fetch(apiUrl);
            // console.log(response.status);
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
                setLocation(location);
                setIsLoading(false);
                document.querySelector('.city-input').value = "";
            } else if (response.status === 400) {
                // Bad request error
                alert('City not found. Try again');
                document.querySelector('.city-input').value = "";
                setIsLoading(false);
            } else if (response.status === 404) {
                // Not found
                alert('Source not found. Try again');
                document.querySelector('.city-input').value = "";
                setIsLoading(false);
            } else if (response.status === 500) {
                // "Server Error" (internal server error).
                alert('Server not responding. Try again');
                document.querySelector('.city-input').value = "";
                setIsLoading(false);
            } else {
                // Handle other errors.
                alert('Error occured. Try again');
                document.querySelector('.city-input').value = "";
                setIsLoading(false);
            }
        } catch (error) {
            alert('Error occured. Try again');
            document.querySelector('.city-input').value = "";
            setIsLoading(false);
        }
    };

    // Initial API call for the default location
    useEffect(() => {
        if (initialLoad) {
            fetchWeatherData(searchValue);
            setInitialLoad(false);
        }
    }, [initialLoad]);

    // Fetch weather data when the user clicks "Search"
    const handleSearch = () => {
        if (searchValue && searchValue !== location) {
            setIsLoading(true);
            fetchWeatherData(searchValue);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <div className='Company'>
                    <img src={Logo} alt="" />
                    <h2>Weather Today</h2>
                </div>
                <div className='search'>
                    <input type='text' className='city-input' placeholder='Search City' onChange={(e) => setSearchValue(e.target.value)} />
                    <img src={search_icon} alt='search-icon' onClick={() => handleSearch()} />
                </div>
            </div>
        { isLoading ? (<SkeletonComponent />
        ) : (
            <div className='container-body'>
                <div className='left'>
                    <div className='box1 bg-img'>
                        <div className='weather-details'>
                            <h2 className='location'>
                                {(weatherData?.location.name || 'Unknown')}
                            </h2>
                            <p>{(weatherData?.current.condition.text || 'Unknown')}</p>
                            <img
                                src={(weatherData?.current.condition.icon || 'Unknown')}
                                alt=""
                            />
                            <h1 className='temperature'>
                                {(`${weatherData?.current.temp_c || '-'}°C`)}
                            </h1>
                        </div>
                        <div className='weather-conditions'>
                            <div className="division">
                                <div className='condition'>
                                    <img className='condition-logo' src={forecastHumidity}></img>
                                    <h4 className='condition-name'>Humidity</h4>
                                </div>
                                <h2 className="condition-value">{`${weatherData.current.humidity}%`}</h2>
                            </div>
                            <div className="division">
                                <div className='condition'>
                                    <img className='condition-logo' src={windSpeed}></img>
                                    <h4 className='condition-name'>Wind speed</h4>
                                </div>
                                <h2 className="condition-value">{`${weatherData.current.wind_kph} km/h`}</h2>
                            </div>
                            <div className="division">
                                <div className='condition'>
                                    <img className='condition-logo' src={feelsLike}></img>
                                    <h4 className='condition-name'>Feels like</h4>
                                </div>
                                <h2 className="condition-value">{`${weatherData.current.feelslike_c}°`}</h2>
                            </div>
                            <div className="division">
                                <div className='condition'>
                                    <img className='condition-logo' src={uvIndex}></img>
                                    <h4 className='condition-name'>UV Index</h4>
                                </div>
                                <h2 className="condition-value">{weatherData.current.uv}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='box2'>
                        <h4>Next 6 Hours Forecast</h4>
                        <TodayForecast weatherFData={weatherData} />
                    </div>
                </div>
                <WeekForecast weatherData={weatherData}/>
            </div>
        )}
        <div className='footer'>
            <p>Copyright &copy; 2023 Weather Today | All rights reserved.</p>
        </div>
        </div>
    );
}

export default WeatherApp;
