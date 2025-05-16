import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState("")

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
      {searchCountry && (
        filteredCountries.map(country => (
          <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
              {country.languages ? (
                Object.entries(country.languages).map(([code, name]) => (
                  <li key={code}>{name}</li>
                ))
              ) : (
                <p>No language data available</p>
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  )  
}

export default App