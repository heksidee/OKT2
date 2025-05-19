import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {capital, api_key} ) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    .then(response => setWeather(response.data))
    }, [capital, api_key]);

    if (!weather) return <p>Loading weather data...</p>

    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather.main.temp}°C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
}

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
      .catch(error => console.log("Error fetching data:", error));
  }, []);


  const filteredCountries = searchCountry
    ? countries.filter(country =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    )
    : [];

  return (
    <div>
      <p>Find countries</p>
      <input
        type="text"
        placeholder='Enter country name...'
        onChange={(e) => setSearchCountry(e.target.value)}
      />
      
      {selectedCountry ? (
  
        <div key={selectedCountry.cca3}>
          <button onClick={() => setSelectedCountry(null)}>Back</button>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <h2>Languages</h2>
          <ul>
            {selectedCountry.languages && Object.entries(selectedCountry.languages).map(([code, name]) => (
              <li key={code}>{name}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} />
          <Weather capital={selectedCountry.capital} api_key={api_key}/>
        </div>
      ) : (
        
        searchCountry && (
          filteredCountries.length > 10 ? (
            <p>Too many matches, specify your search</p>
          ) : filteredCountries.length === 1 ? (
            filteredCountries.map(country => (
              <div key={country.cca3}>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                  {country.languages && Object.entries(country.languages).map(([code, name]) => (
                    <li key={code}>{name}</li>
                  ))}
                </ul>
                <img src={country.flags.png} />
                <Weather capital={country.capital} api_key={api_key} />
              </div>
            ))
          ) : (
            <ul>
              {filteredCountries.map(country => (
                <div key={country.cca3} style={{display: "flex", gap: "10px"}}>
                  <li>{country.name.common}</li>
                  <button onClick={() => setSelectedCountry(country)}>Show</button>
                </div>
              ))}
            </ul>
          )
        )
      )}
      
    </div>
  )  
}

export default App