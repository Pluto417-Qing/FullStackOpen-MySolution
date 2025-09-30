import { useEffect, useState } from "react";
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY

const Country = ({country}) => {
    const [showDetail, setShowDetail] = useState(false)

    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${api_key}`)
        .then(res => res.data)
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                
                return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
            }
            throw new Error('Location not found');
        })
        .then(res => res.data)
        .then(weatherData => {
            country.temp = (weatherData.main.temp - 273.15).toFixed(2); 
            country.windSpeed = weatherData.wind.speed;
            country.weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
    },[country])
    return (
        <div>
        {
            showDetail? 
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h1>Languages</h1>
                <ul>
                {
                    Object.values(country.languages).map((language, index) => {
                        return <li key={index}>{language}</li>
                    })
                }
                </ul>
                <img src={country.flags.png}/>
                <h1>Weather in {country.capital}</h1>
                <p>Temperature {country.temp} Celsius</p>
                <p><img src={country.weatherIcon}/></p>
                <p>Wind {country.windSpeed} m/s</p>
                <p><button onClick={() => setShowDetail(!showDetail)}>unshow</button></p>
            </div> : <p>{country.name.common} <button onClick={() => setShowDetail(!showDetail)}>show</button></p>
        }
        </div>
    )
}

export default Country;